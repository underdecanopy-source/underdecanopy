# Backend Issues Fix and API Creation - Implementation Plan

## Priority 1: Database Schema Updates
- [x] Add NewsletterSubscription model to Prisma schema
- [x] Run Prisma migrations for new model

## Priority 2: Authentication APIs
- [x] Create app/api/auth/register/route.ts for user registration
- [x] Create app/api/auth/login/route.ts for user login
- [ ] Add JWT token handling and validation

## Priority 3: Service Management APIs
- [x] Create app/api/services/route.ts for CRUD operations on services
- [ ] Create app/api/services/[id]/route.ts for individual service operations

## Priority 4: Service Request APIs
- [x] Create app/api/service-requests/route.ts for creating and listing service requests
- [ ] Create app/api/service-requests/[id]/route.ts for individual request operations

## Priority 5: Training Course APIs
- [x] Create app/api/training-courses/route.ts for CRUD operations on courses
- [ ] Create app/api/training-courses/[id]/route.ts for individual course operations

## Priority 6: Business Registration APIs
- [x] Create app/api/business-registrations/route.ts for creating and listing registrations
- [ ] Create app/api/business-registrations/[id]/route.ts for individual registration operations

## Priority 7: Cafe Menu APIs
- [x] Create app/api/cafe-menu/route.ts for CRUD operations on menu items
- [ ] Create app/api/cafe-menu/[id]/route.ts for individual menu item operations

## Priority 8: Newsletter Subscription APIs
- [x] Create app/api/newsletter/route.ts for subscription management
- [x] Update lib/actions/newsletter.ts to save subscriptions to database

## Priority 9: Admin Content Management APIs
- [ ] Create app/api/admin/services/route.ts for admin service management
- [ ] Create app/api/admin/training-courses/route.ts for admin course management
- [ ] Create app/api/admin/cafe-menu/route.ts for admin menu management

## Priority 10: Validation and Error Handling
- [x] Add comprehensive input validation using Zod schemas
- [x] Implement proper error responses and status codes
- [ ] Add rate limiting and security measures

## Priority 11: Testing and Integration
- [ ] Test all new API endpoints
- [ ] Update frontend components to integrate with new APIs
- [ ] Add proper error handling in frontend components
