
# ISKCON Lucknow Temple Website

A modern, responsive website for ISKCON Lucknow temple built with React, TypeScript, and Supabase.

## Features

- Event management system
- Photo gallery with collections
- Daily darshan schedule
- Festival calendar
- User authentication
- Admin dashboard
- Popup notifications
- Responsive design

## Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- Supabase (Backend & Database)
- Vite (Build tool)
- React Router (Navigation)
- Shadcn/UI (UI Components)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd iskcon-lucknow-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase:
   - Create a new project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key
   - Update `src/integrations/supabase/client.ts` with your credentials
   - Update `supabase/config.toml` with your project ID

4. Run the database migrations:
   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Run the migration files in the `supabase/migrations/` folder in order

5. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── integrations/       # External service integrations
├── lib/                # Utility functions
└── App.tsx            # Main application component

supabase/
├── migrations/         # Database migration files
└── config.toml        # Supabase configuration
```

## Database Schema

The project uses the following main tables:
- `events` - Event management
- `gallery_photos` - Photo gallery
- `festival_calendar` - Festival dates
- `darshan_schedule` - Daily temple schedule
- `admin_popup` - Admin notifications
- `profiles` - User profiles
- `temple_info` - Temple information

## Admin Features

Admin users can:
- Create and manage events
- Upload and organize gallery photos
- Update temple information
- Manage daily schedules
- Create popup notifications
- View user management

## Authentication

The project uses Supabase Auth for user authentication with email/password login.

## Deployment

The project can be deployed to any static hosting service:

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting service

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
