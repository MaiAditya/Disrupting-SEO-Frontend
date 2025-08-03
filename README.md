# SEO Analytics Dashboard

A comprehensive brand monitoring dashboard built with React, Next.js, and Material-UI that tracks brand performance across AI models and search engines.

## 🚀 Features

- **Overview Dashboard** - Real-time brand performance metrics
- **Competitor Analysis** - Track and compare competitor mentions
- **Geographic Analytics** - Region-based performance tracking
- **Persona Management** - Target audience analytics
- **Brand Book** - Centralized brand information management
- **Analytics Suite**:
  - Mention Analytics
  - Ranking Analytics
  - Perception Analytics
  - Prompt Analytics
  - Citation Analytics

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **UI Library**: Material-UI (MUI) v5
- **Charts**: ApexCharts with react-apexcharts
- **Styling**: Material-UI theme system
- **Icons**: Material-UI Icons

## 📋 Prerequisites

Choose **ONE** of the following setup methods:

### Option A: Docker (Recommended - No Node.js installation needed!)
- **Docker Desktop** (includes Docker and Docker Compose)
- Download from: https://docs.docker.com/get-docker/

### Option B: Traditional Setup
- **Node.js** (version 18.0 or higher)
- **npm** or **yarn** package manager

## 🐳 Quick Start with Docker (Easiest!)

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd seo-frontend-dashboard
```

### 2. Run with Docker (One Command!)

**For Linux/Mac:**
```bash
./run-docker.sh
```

**For Windows:**
```bash
run-docker.bat
```

**Or manually:**
```bash
# Development mode (with hot reload)
docker compose --profile dev up --build

# Production mode
docker compose --profile prod up --build
```

### 3. Open Your Browser
Navigate to [http://localhost:3000](http://localhost:3000) to view the dashboard.

### 4. Stop the Application
Press `Ctrl+C` or run:
```bash
docker compose down
```

---

## 🔧 Traditional Installation & Setup (Alternative)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open Your Browser
Navigate to [http://localhost:3000](http://localhost:3000) to view the dashboard.

## 📁 Project Structure

```
src/
├── components/
│   ├── common/           # Reusable UI components
│   │   ├── Layout.tsx    # Main application layout
│   │   └── InfoIcon.tsx  # Info tooltip component
│   ├── charts/           # Chart-related components
│   │   └── ChartWrapper.tsx  # Chart error boundary & utilities
│   └── screens/          # Main screen components
│       └── OverviewScreen.tsx    # Dashboard overview
├── pages/               # Next.js pages
│   ├── _app.tsx        # App wrapper
│   └── index.tsx       # Main dashboard page
├── styles/             # Styling and theme
│   └── theme.ts        # Material-UI theme configuration
├── types/              # TypeScript type definitions
│   └── index.ts        # Shared interfaces and types
└── utils/              # Utility functions
```

## 🎨 Customization

### Theme Configuration

The app uses Material-UI's theming system. You can customize colors, typography, and component styles in `src/styles/theme.ts`:

```typescript
export const theme = createTheme({
  palette: {
    primary: {
      main: '#6366f1', // Customize primary color
    },
    secondary: {
      main: '#10b981', // Customize secondary color
    },
  },
  // ... other theme options
});
```

### Adding New Screens

1. Create a new component in `src/components/screens/`
2. Add the screen type to `src/types/index.ts`
3. Update the navigation in `src/components/common/Layout.tsx`
4. Add the route handler in `src/pages/index.tsx`

## 📊 Current Implementation Status

### ✅ Completed
- [x] Project structure and configuration
- [x] Main layout with responsive navigation
- [x] Overview screen with 6 key analytics charts
- [x] Theme system and styling
- [x] Chart integration with error handling
- [x] TypeScript support

### 🚧 In Progress
- [ ] Extract remaining screen components from original file
- [ ] Implement data fetching and state management
- [ ] Add form components for settings screens

### 📝 To Do
- [ ] Competitor management screen
- [ ] Geography settings screen
- [ ] Persona management screen
- [ ] Brand book screen
- [ ] All analytics screens (Mentions, Rankings, etc.)
- [ ] API integration
- [ ] Data persistence
- [ ] Testing setup

## 🔧 Available Commands

### Docker Commands (Recommended)
```bash
# Easy scripts
./run-docker.sh              # Interactive menu (Linux/Mac)
run-docker.bat               # Interactive menu (Windows)

# Manual Docker commands
docker compose --profile dev up --build    # Development mode
docker compose --profile prod up --build   # Production mode
docker compose down                        # Stop containers
docker compose down --volumes             # Stop and clean volumes
```

### Traditional npm Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

## 🐛 Troubleshooting

### Docker Issues

1. **Docker not found**
   - Install Docker Desktop: https://docs.docker.com/get-docker/
   - Ensure Docker is running (check system tray/menu bar)

2. **Port 3000 already in use**
   ```bash
   # Find and kill process using port 3000
   lsof -ti:3000 | xargs kill -9
   # Or use different port in docker-compose.yml
   ```

3. **Docker build fails**
   ```bash
   # Clean Docker cache and rebuild
   docker system prune -f
   docker compose --profile dev up --build --force-recreate
   ```

4. **Hot reload not working in Docker**
   - This is expected in production mode
   - Use development mode: `docker compose --profile dev up`

### Application Issues

1. **Chart Not Rendering**
   - Charts are client-side only due to SSR limitations
   - Ensure you're not trying to render charts on the server

2. **TypeScript Errors**
   - Run `npm run type-check` to identify issues
   - Ensure all imports have proper paths with `@/` prefix

3. **Module Not Found**
   - With Docker: Rebuild container `docker compose up --build`
   - Without Docker: `npm install` and check import paths

## 🔄 Migration from Original File

The original large TSX file has been restructured into a modular architecture:

1. **Layout & Navigation**: Extracted to `Layout.tsx`
2. **Overview Screen**: Moved to `OverviewScreen.tsx`
3. **Theme Configuration**: Separated to `theme.ts`
4. **Types**: Organized in `types/index.ts`
5. **Remaining Screens**: Need to be extracted (see roadmap above)

## 🚀 Production Deployment

### Build the Application

```bash
npm run build
```

### Deploy Options

- **Vercel**: `npm i -g vercel && vercel`
- **Netlify**: Connect your git repository
- **Docker**: Create a Dockerfile for containerized deployment

## 🤝 Contributing

1. Extract remaining screen components from the original file
2. Add proper error handling and loading states
3. Implement API integration
4. Add unit tests
5. Improve accessibility

## 📄 License

This project is private and proprietary.

---

## 🆘 Need Help?

If you encounter any issues:
1. Check the troubleshooting section above
2. Ensure all dependencies are correctly installed
3. Verify your Node.js version is 18+
4. Check the browser console for error messages

The dashboard is now ready for development and further feature implementation!