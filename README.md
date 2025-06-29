**Deployment URL:** [https://xendit-fe.vercel.app/](https://xendit-fe.vercel.app/)

## Project Overview

This is a simple payment gateway integration that allows users to pay into the system and access paid features/content. The platform includes a learning management system where users can purchase subscription packages to access premium course content.

### Features

- **Authentication System**: Complete login/register functionality with JWT tokens
- **Payment Integration**: Xendit payment gateway with multiple payment methods
- **Subscription Management**: Package-based subscription system
- **Content Access Control**: Premium content locked behind paywall
- **User Dashboard**: Profile management and payment history

## Payment Methods Supported

1. **Virtual Account**
   - BCA, BNI, BRI, Mandiri, Permata, BSI, CIMB
2. **Credit/Debit Cards**
   - Visa, Mastercard, JCB
3. **QR Code**
   - QRIS for e-wallet payments

## Architecture

### Frontend (This Repository)

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Hooks
- **HTTP Client**: Axios

### Backend

- **Repository**: [Backend Repository Link](https://github.com/matthewhjt/nest-xendit-be)
- **Framework**: NestJS
- **Database**: PostgreSQL
- **Payment Gateway**: Xendit
- **Authentication**: JWT

## Getting Started

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm/bun

### Installation

1. Clone the repository:

```
git clone https://github.com/matthewhjt/xendit-fe.git
```

2. Install dependencies:

```
npm install
# or
yarn install
# or
pnpm install
```

3. Setup env:  
   Copy .env.example

```
NEXT_PUBLIC_API_URL=https://your-backend-api-url.com
```

4. Run dev server:

```
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Deployment

- Frontend (Vercel)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on every push to main branch

## Application Flow

1. User Registration/Login

   Users can create accounts or login with existing credentials JWT tokens are stored securely in cookies

2. Browse Classes

   View available learning classes
   See free vs premium content indicators
   Access basic class information

3. Subscription Purchase

   Choose from available subscription packages
   Select payment method (Virtual Account, Credit Card, or QRIS)
   Complete payment through Xendit gateway
   Receive real-time payment status updates

4. Access Premium Content

   After successful payment, users can access premium class materials
   Content is organized in chapters and subchapters
   Clear visual indicators for free vs premium content

5. Profile & History

   View personal profile information
   Track payment history and subscription status
   Monitor active subscriptions
