# Underdecanopy Digital Hub

A comprehensive digital platform providing business services, training courses, and cafe experiences. Built with Next.js 14, TypeScript, Prisma, and PostgreSQL.

## 🚀 Features

- **Multi-Service Platform**: CoopHub, ApplySmart, SmartTax, SwiftWheel, TechLift, TrustFix
- **Business Services**: Registration, consultation, and support
- **Training Courses**: Tech education and skill development
- **Cafe Menu**: Digital cafe ordering system
- **Newsletter Management**: Email subscription and notifications
- **Contact Forms**: Multi-channel customer communication
- **User Authentication**: Secure login and registration
- **API-First Architecture**: RESTful API endpoints for all services

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS
- **Authentication**: Supabase Auth
- **Email**: Nodemailer with SMTP
- **Testing**: Jest with React Testing Library
- **Linting**: ESLint with Next.js config

## 📋 Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- PostgreSQL database
- SMTP server credentials (for email)
- Supabase account (optional, for auth)

## 🚦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/underdecanopy-source/underdecanopy.git
cd underdecanopy
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `DIRECT_URL`: Direct database connection for migrations
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`: Email configuration
- `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`: Supabase credentials (if using)

### 4. Set up the database

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# (Optional) Seed database
npx prisma db seed
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
underdecanopy/
├── app/                    # Next.js app directory
│   ├── (Auth)/            # Authentication pages
│   ├── (main)/            # Main service pages
│   ├── api/               # API routes
│   ├── sites/             # Subdomain-specific pages
│   └── components/        # App-specific components
├── components/            # Shared React components
├── lib/                   # Utilities and libraries
│   ├── actions/           # Server actions
│   ├── auth/              # Authentication utilities
│   ├── data/              # Data fetching
│   └── utils/             # Helper functions
├── prisma/                # Database schema and migrations
└── public/                # Static assets
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Services
- `GET /api/services` - List all services
- `POST /api/services` - Create new service
- `POST /api/service-requests` - Create service request

### Training
- `GET /api/training-courses` - List training courses
- `POST /api/training-courses` - Create training course

### Business
- `POST /api/business-registrations` - Submit business registration

### Cafe
- `GET /api/cafe-menu` - Get cafe menu items
- `POST /api/cafe-menu` - Add menu item

### Newsletter
- `POST /api/newsletter` - Subscribe to newsletter
- `DELETE /api/newsletter` - Unsubscribe

### Contact
- `POST /api/contact` - Send contact form

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🎨 Linting

```bash
# Run ESLint
npm run lint
```

## 🏗️ Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Docker (Alternative)

```bash
# Build Docker image
docker build -t underdecanopy .

# Run container
docker run -p 3000:3000 underdecanopy
```

## 🔒 Security

- All passwords are hashed using bcrypt
- API routes include input validation with Zod
- CORS configuration for API security
- Environment variables for sensitive data
- SQL injection prevention with Prisma

## 📈 SEO

- Dynamic sitemap generation
- Robots.txt configuration
- Open Graph metadata
- Twitter Card support
- Structured data (JSON-LD)
- Optimized images with lazy loading

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential.

## 📞 Support

For support, email contactus@underdecanopy.com or visit our website.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting platform
- All contributors and users
