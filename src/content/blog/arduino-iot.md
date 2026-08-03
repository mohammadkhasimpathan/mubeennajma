# Building Your First IoT Project with Arduino

The Internet of Things (IoT) is transforming how devices interact with the world. Arduino makes it accessible to everyone, from beginners to professionals. In this guide, I'll walk you through building a complete temperature monitoring system that sends data to the cloud.

## What You'll Build

A temperature and humidity monitoring system that:
- Reads data from a DHT22 sensor
- Displays values on an OLED screen
- Sends data to a web dashboard every 30 seconds
- Triggers an alert when temperature exceeds a threshold

## Components Required

| Component | Quantity | Price (approx) |
|-----------|----------|----------------|
| Arduino Uno | 1 | ₹500 |
| DHT22 Sensor | 1 | ₹150 |
| SSD1306 OLED (128x64) | 1 | ₹300 |
| ESP8266 WiFi Module | 1 | ₹200 |
| Buzzer | 1 | ₹30 |
| Resistors (10kΩ) | 2 | ₹5 |
| Jumper Wires | — | ₹100 |
| Breadboard | 1 | ₹100 |

## Circuit Diagram

```
DHT22 → Arduino Uno:
  VCC → 5V
  GND → GND
  DATA → D2 (with 10kΩ pull-up to VCC)

OLED → Arduino Uno:
  VCC → 3.3V
  GND → GND
  SDA → A4
  SCL → A5

ESP8266 → Arduino Uno:
  VCC → 3.3V
  GND → GND
  TX → D10 (Software Serial)
  RX → D11 (Software Serial)
```

## Arduino Code

### Step 1: Install Required Libraries

Open Arduino IDE → Tools → Manage Libraries:
- `DHT sensor library` by Adafruit
- `Adafruit SSD1306`
- `Adafruit GFX Library`

### Step 2: Main Sketch

```cpp
#include <DHT.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <SoftwareSerial.h>

// Pin definitions
#define DHT_PIN 2
#define DHT_TYPE DHT22
#define BUZZER_PIN 8
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define TEMP_THRESHOLD 35.0  // Alert above 35°C

// Initialize objects
DHT dht(DHT_PIN, DHT_TYPE);
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);
SoftwareSerial espSerial(10, 11); // RX, TX

float temperature, humidity;
unsigned long lastSendTime = 0;
const unsigned long SEND_INTERVAL = 30000; // 30 seconds

void setup() {
  Serial.begin(9600);
  espSerial.begin(9600);
  dht.begin();
  pinMode(BUZZER_PIN, OUTPUT);
  
  // Initialize OLED
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println("OLED initialization failed!");
    while (true);
  }
  
  display.clearDisplay();
  display.setTextColor(WHITE);
  display.setTextSize(2);
  display.setCursor(10, 20);
  display.println("IoT Monitor");
  display.display();
  delay(2000);
  
  Serial.println("System initialized!");
}

void loop() {
  // Read sensor data
  humidity = dht.readHumidity();
  temperature = dht.readTemperature();
  
  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }
  
  // Update OLED display
  updateDisplay();
  
  // Check temperature alert
  if (temperature > TEMP_THRESHOLD) {
    triggerAlert();
  }
  
  // Send data to cloud every 30 seconds
  if (millis() - lastSendTime >= SEND_INTERVAL) {
    sendToCloud();
    lastSendTime = millis();
  }
  
  delay(2000);
}

void updateDisplay() {
  display.clearDisplay();
  
  // Temperature
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.println("Temperature:");
  display.setTextSize(2);
  display.setCursor(0, 12);
  display.print(temperature, 1);
  display.println(" C");
  
  // Humidity
  display.setTextSize(1);
  display.setCursor(0, 35);
  display.println("Humidity:");
  display.setTextSize(2);
  display.setCursor(0, 47);
  display.print(humidity, 1);
  display.println(" %");
  
  display.display();
}

void triggerAlert() {
  // Beep buzzer 3 times
  for (int i = 0; i < 3; i++) {
    digitalWrite(BUZZER_PIN, HIGH);
    delay(200);
    digitalWrite(BUZZER_PIN, LOW);
    delay(200);
  }
}

void sendToCloud() {
  // Send AT commands to ESP8266
  String data = "temp=" + String(temperature, 1) + "&hum=" + String(humidity, 1);
  
  espSerial.println("AT+CIPSTART=\"TCP\",\"api.example.com\",80");
  delay(2000);
  
  String request = "GET /update?" + data + " HTTP/1.1\r\nHost: api.example.com\r\n\r\n";
  espSerial.println("AT+CIPSEND=" + String(request.length()));
  delay(1000);
  espSerial.print(request);
  
  Serial.println("Data sent: " + data);
}
```

## Cloud Dashboard

For the web dashboard, you can use platforms like:
- **Adafruit IO** (free, easy to use)
- **ThingSpeak** (free tier available)
- **Blynk** (mobile + web dashboard)

### Using ThingSpeak (Recommended for Beginners)

1. Create an account at [thingspeak.com](https://thingspeak.com)
2. Create a new channel with two fields: Temperature, Humidity
3. Copy your Channel ID and Write API Key
4. Update the Arduino code with your API credentials

## Troubleshooting Tips

**Sensor reads NaN:**
- Check wiring connections
- Add a 10kΩ pull-up resistor on the DATA pin
- Try lowering the delay between readings

**WiFi connection drops:**
- Power ESP8266 from a separate 3.3V supply
- Add 100μF capacitor across VCC/GND of ESP8266

**OLED shows nothing:**
- Verify I2C address (use I2C scanner sketch)
- Check SDA/SCL connections

## Next Steps

Once your basic system works, you can extend it with:
- Machine learning anomaly detection
- Mobile push notifications
- Multiple sensor nodes
- Time-series data visualization
- Historical data analysis

Building IoT projects with Arduino is incredibly rewarding. The combination of hardware sensing and software processing opens up a world of possibilities!
