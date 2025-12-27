```mermaid
sequenceDiagram
    participant Client
    participant API as API Gateway
    participant Media as Media Service
    participant Storage as Cloudinary / S3
    participant DB as MongoDB

    Client->>API: Upload Image/Video
    API->>Media: Forward file
    Media->>Storage: Store media
    Storage-->>Media: Media URL
    Media->>DB: Save metadata
    Media-->>Client: Upload success + URL

```