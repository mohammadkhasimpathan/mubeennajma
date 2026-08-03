# Introduction to VLSI Design: From Concept to Chip

VLSI (Very Large Scale Integration) design is the art of designing microchips with millions of transistors. This guide walks through the complete design flow.

## The ASIC Design Flow

```
RTL Design (Verilog/VHDL) → Synthesis → Place & Route → GDSII → Fabrication
```

## Writing RTL in Verilog

```verilog
module counter_4bit (
    input wire clk,
    input wire rst_n,
    input wire en,
    output reg [3:0] count
);

always @(posedge clk or negedge rst_n) begin
    if (!rst_n) count <= 4'b0000;
    else if (en) count <= count + 1'b1;
end

endmodule
```

## Key Concepts

- **CMOS Logic**: All chips use NMOS + PMOS transistors
- **Setup/Hold Time**: Critical timing constraints
- **Power**: P = α × C × V² × f (dynamic power)

## FPGA vs ASIC

| Feature | FPGA | ASIC |
|---------|------|------|
| Cost | Low (prototyping) | High (production) |
| Speed | Moderate | Very Fast |
| Flexibility | Reprogrammable | Fixed |
| Volume | Small batches | Mass production |

## Tools

- **Xilinx Vivado** — Synthesis + Implementation
- **ModelSim** — Simulation
- **Cadence Virtuoso** — Analog design

VLSI design bridges software algorithms and physical silicon — a truly fascinating field at the intersection of physics, mathematics, and computer science.
