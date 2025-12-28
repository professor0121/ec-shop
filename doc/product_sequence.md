```mermaid
sequenceDiagram
    participant Admin
    participant ProductService
    participant MongoDB
    participant RabbitMQ
    participant SearchService
    participant CartService
    participant OrderService

    Admin->>ProductService: Create Product
    ProductService->>MongoDB: Save Product
    ProductService->>RabbitMQ: PRODUCT_CREATED
    RabbitMQ->>SearchService: Index Product
    RabbitMQ->>CartService: Sync Product
    RabbitMQ->>OrderService: Snapshot Product
```