# Underdecanopy API Documentation

## Base URL

```
Production: https://underdecanopy.com/api
Development: http://localhost:3000/api
```

## Authentication

Most public endpoints don't require authentication. Protected endpoints require a valid session token.

### Headers

```
Content-Type: application/json
Authorization: Bearer <token> (for protected endpoints)
```

## Rate Limiting

- **Limit**: 100 requests per minute per IP
- **Headers**: Response includes `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`
- **429 Status**: Returns when limit exceeded with `Retry-After` header

## Endpoints

### Health Check

Check API and database health status.

```http
GET /api/health
```

**Response (200 OK)**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "database": "connected",
  "uptime": 12345.67
}
```

---

### Authentication

#### Register User

Create a new user account.

```http
POST /api/auth/register
```

**Request Body**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (201 Created)**
```json
{
  "message": "User created successfully",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "USER",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses**
- `400`: Validation failed or user already exists
- `500`: Internal server error

#### Login

Authenticate a user.

```http
POST /api/auth/login
```

**Request Body**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (200 OK)**
```json
{
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "USER"
  }
}
```

**Error Responses**
- `401`: Invalid credentials
- `400`: Validation failed
- `500`: Internal server error

---

### Services

#### List Services

Get all available services.

```http
GET /api/services
```

**Response (200 OK)**
```json
{
  "services": [
    {
      "id": "uuid",
      "name": "Business Registration",
      "description": "Complete business registration services",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Create Service

Create a new service (Admin only).

```http
POST /api/services
```

**Request Body**
```json
{
  "name": "Service Name",
  "description": "Service description"
}
```

**Response (201 Created)**
```json
{
  "message": "Service created successfully",
  "service": {
    "id": "uuid",
    "name": "Service Name",
    "description": "Service description"
  }
}
```

---

### Service Requests

#### Create Service Request

Submit a new service request.

```http
POST /api/service-requests
```

**Request Body**
```json
{
  "userId": "uuid",
  "serviceId": "uuid",
  "details": "Request details"
}
```

**Response (201 Created)**
```json
{
  "message": "Service request created successfully",
  "serviceRequest": {
    "id": "uuid",
    "userId": "uuid",
    "serviceId": "uuid",
    "details": "Request details",
    "status": "PENDING"
  }
}
```

#### List Service Requests

Get all service requests (requires authentication).

```http
GET /api/service-requests
```

**Response (200 OK)**
```json
{
  "serviceRequests": [
    {
      "id": "uuid",
      "status": "PENDING",
      "details": "Request details",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### Training Courses

#### List Training Courses

Get all available training courses.

```http
GET /api/training-courses
```

**Response (200 OK)**
```json
{
  "trainingCourses": [
    {
      "id": "uuid",
      "name": "Web Development",
      "description": "Learn web development",
      "duration": "12 weeks",
      "price": 50000
    }
  ]
}
```

#### Create Training Course

Create a new training course (Admin only).

```http
POST /api/training-courses
```

**Request Body**
```json
{
  "name": "Course Name",
  "description": "Course description",
  "duration": "8 weeks",
  "price": 40000
}
```

---

### Business Registrations

#### Create Business Registration

Submit a business registration request.

```http
POST /api/business-registrations
```

**Request Body**
```json
{
  "userId": "uuid",
  "businessName": "Company Ltd",
  "businessType": "LIMITED"
}
```

**Response (201 Created)**
```json
{
  "message": "Business registration created successfully",
  "businessRegistration": {
    "id": "uuid",
    "businessName": "Company Ltd",
    "businessType": "LIMITED",
    "status": "PENDING"
  }
}
```

---

### Cafe Menu

#### Get Cafe Menu

Get all cafe menu items.

```http
GET /api/cafe-menu
```

**Response (200 OK)**
```json
{
  "cafeMenuItems": [
    {
      "id": "uuid",
      "name": "Coffee",
      "description": "Freshly brewed",
      "price": 500,
      "category": "Beverages"
    }
  ]
}
```

#### Add Menu Item

Add a new menu item (Admin only).

```http
POST /api/cafe-menu
```

**Request Body**
```json
{
  "name": "Item Name",
  "description": "Item description",
  "price": 1000,
  "category": "Food"
}
```

---

### Newsletter

#### Subscribe to Newsletter

Subscribe an email to the newsletter.

```http
POST /api/newsletter
```

**Request Body**
```json
{
  "email": "user@example.com"
}
```

**Response (201 Created)**
```json
{
  "message": "Successfully subscribed to newsletter"
}
```

#### Unsubscribe from Newsletter

Unsubscribe an email from the newsletter.

```http
DELETE /api/newsletter
```

**Request Body**
```json
{
  "email": "user@example.com"
}
```

**Response (200 OK)**
```json
{
  "message": "Successfully unsubscribed from newsletter"
}
```

---

### Contact

#### Send Contact Form

Submit a contact form message.

```http
POST /api/contact
```

**Request Body**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Your message",
  "purpose": "inquiry",
  "path": "https://underdecanopy.com"
}
```

**Response (200 OK)**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

---

## Error Handling

All endpoints return errors in the following format:

```json
{
  "error": "Error message",
  "details": {} // Optional additional details
}
```

### Common Status Codes

- `200 OK`: Request succeeded
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error

---

## Validation

All endpoints validate input using Zod schemas. Validation errors return:

```json
{
  "error": "Validation failed",
  "details": [
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "undefined",
      "path": ["email"],
      "message": "Required"
    }
  ]
}
```

---

## Support

For API support, contact: contactus@underdecanopy.com
