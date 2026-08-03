# Building REST APIs with Spring Boot: A Practical Guide

Spring Boot makes building production-ready REST APIs incredibly straightforward. In this guide, we'll build a complete product management API with authentication, error handling, and database integration.

## Project Setup

Start by creating a Spring Boot project at [start.spring.io](https://start.spring.io):

**Dependencies:**
- Spring Web
- Spring Data JPA
- MySQL Driver
- Spring Security
- Lombok
- Validation

## Project Structure

```
src/main/java/com/mubeen/api/
├── controller/
│   └── ProductController.java
├── service/
│   ├── ProductService.java
│   └── ProductServiceImpl.java
├── repository/
│   └── ProductRepository.java
├── model/
│   └── Product.java
├── dto/
│   ├── ProductRequest.java
│   └── ProductResponse.java
├── exception/
│   ├── GlobalExceptionHandler.java
│   └── ResourceNotFoundException.java
└── ApiApplication.java
```

## Entity & Repository

```java
// Product.java
@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Product name is required")
    @Column(nullable = false)
    private String name;
    
    @NotNull(message = "Price is required")
    @Positive(message = "Price must be positive")
    private Double price;
    
    private String description;
    
    @Column(nullable = false)
    private Integer stock;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}

// ProductRepository.java
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByNameContainingIgnoreCase(String name);
    Page<Product> findAll(Pageable pageable);
}
```

## Service Layer

```java
@Service
@Transactional
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    
    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;
    
    @Override
    public ProductResponse createProduct(ProductRequest request) {
        Product product = modelMapper.map(request, Product.class);
        Product saved = productRepository.save(product);
        return modelMapper.map(saved, ProductResponse.class);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Page<ProductResponse> getAllProducts(int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        return productRepository.findAll(pageable)
            .map(p -> modelMapper.map(p, ProductResponse.class));
    }
    
    @Override
    @Transactional(readOnly = true)
    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));
        return modelMapper.map(product, ProductResponse.class);
    }
    
    @Override
    public ProductResponse updateProduct(Long id, ProductRequest request) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));
        
        modelMapper.map(request, product);
        return modelMapper.map(productRepository.save(product), ProductResponse.class);
    }
    
    @Override
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product", "id", id);
        }
        productRepository.deleteById(id);
    }
}
```

## REST Controller

```java
@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
@Validated
public class ProductController {
    
    private final ProductService productService;
    
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<ProductResponse> createProduct(
            @Valid @RequestBody ProductRequest request) {
        ProductResponse product = productService.createProduct(request);
        return ApiResponse.success("Product created successfully", product);
    }
    
    @GetMapping
    public ApiResponse<Page<ProductResponse>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy) {
        Page<ProductResponse> products = productService.getAllProducts(page, size, sortBy);
        return ApiResponse.success("Products retrieved successfully", products);
    }
    
    @GetMapping("/{id}")
    public ApiResponse<ProductResponse> getProductById(@PathVariable Long id) {
        ProductResponse product = productService.getProductById(id);
        return ApiResponse.success("Product retrieved successfully", product);
    }
    
    @PutMapping("/{id}")
    public ApiResponse<ProductResponse> updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody ProductRequest request) {
        ProductResponse product = productService.updateProduct(id, request);
        return ApiResponse.success("Product updated successfully", product);
    }
    
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }
}
```

## Global Exception Handling

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleNotFound(ResourceNotFoundException ex) {
        return new ErrorResponse(404, ex.getMessage(), LocalDateTime.now());
    }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors()
            .forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
        return new ErrorResponse(400, "Validation failed", LocalDateTime.now(), errors);
    }
}
```

## Testing with Postman

```
POST /api/v1/products
Content-Type: application/json

{
  "name": "Arduino Uno",
  "price": 599.99,
  "description": "Microcontroller development board",
  "stock": 50
}

Response: 201 Created
{
  "status": "success",
  "message": "Product created successfully",
  "data": {
    "id": 1,
    "name": "Arduino Uno",
    "price": 599.99,
    "stock": 50,
    "createdAt": "2024-01-10T10:30:00"
  }
}
```

## Deployment

```yaml
# application.yml for production
spring:
  datasource:
    url: ${DATABASE_URL}
    username: ${DATABASE_USER}
    password: ${DATABASE_PASSWORD}
  jpa:
    hibernate:
      ddl-auto: update
server:
  port: ${PORT:8080}
```

Spring Boot REST APIs are powerful, clean, and production-ready out of the box. Following these patterns ensures maintainability and scalability!
