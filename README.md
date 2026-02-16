# 🌳 RootSense

**Campus Sustainability Intelligence Platform**

RootSense is a comprehensive sustainability platform designed for college campuses to track tree survival, report civic issues, and measure environmental impact using AI-powered insights.

---

## 🗺️ HOW TO NAVIGATE - START HERE!

### **The app has 5 pages. Here's how to access them:**

#### **On Desktop (wide screen):**
👉 **Look at the LEFT SIDEBAR** - Click any of the 5 menu items:
- 🏠 Home
- 📊 Dashboard  
- 🌲 Trees
- ⚠️ Civic Issues
- 📈 Impact
- 🛡️ Admin

#### **On Mobile/Tablet (small screen):**
👉 **Tap the HAMBURGER MENU (☰)** in the top-left corner, then select any page

#### **Direct URLs (if needed):**
- Home: `http://localhost:3000/`
- Dashboard: `http://localhost:3000/dashboard`
- Trees: `http://localhost:3000/trees`
- Issues: `http://localhost:3000/issues`
- Impact: `http://localhost:3000/impact`
- Admin: `http://localhost:3000/admin`

---

## 🚀 Quick Start for Judges/Evaluators

### Running the Application

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   ```
   http://localhost:3000
   ```

### Navigation Guide

The application has **5 main sections** accessible via the sidebar (desktop) or mobile menu:

| Section | URL | Description |
|---------|-----|-------------|
| **🏠 Home** | `/` | Landing page with overview and features |
| **📊 Dashboard** | `/dashboard` | Real-time sustainability metrics and analytics |
| **🌲 Trees** | `/trees` | Tree monitoring and AI health analysis |
| **⚠️ Civic Issues** | `/issues` | Report and track campus environmental issues |
| **📈 Impact** | `/impact` | Environmental impact metrics and leaderboards |
| **🛡️ Admin** | `/admin` | User management and system control (Admin only) |

---

## ✨ Key Features

### 1. Tree Survival Tracking
- **AI-Powered Analysis**: Upload tree photos for automated health assessment
- **Location Tracking**: GPS-based tree mapping across campus
- **Historical Data**: Track tree health trends over time
- **Survival Metrics**: Monitor tree survival rates and identify at-risk trees

### 2. Civic Issue Reporting
- **Easy Submission**: Report environmental issues with photos and location
- **Priority Tracking**: Issues categorized by urgency (Low, Medium, High, Critical)
- **Status Updates**: Track resolution progress (Open, In Progress, Resolved)
- **Categories**: Irrigation, waste management, infrastructure, and more

### 3. Eco-Impact Intelligence
- **Water Conservation**: Track liters saved through efficient irrigation
- **Carbon Offset**: Calculate CO₂ sequestration from campus trees
- **Green Score**: Campus-wide sustainability rating (0-100)
- **Department Leaderboards**: Gamified sustainability competition

---

## 🎯 Demo Flow for Judges

### Recommended Evaluation Path

1. **Start at Landing Page** (`/`)
   - View project overview and features
   - Understand the value proposition

2. **Explore Dashboard** (`/dashboard`)
   - See real-time metrics (trees monitored, issues, water saved)
   - View health trend charts and weekly activity graphs
   - Check recent activity feed

3. **Visit Trees Section** (`/trees`)
   - Browse tree inventory with filters
   - Upload a tree photo to test AI analysis
   - View tree health status and location data

4. **Check Civic Issues** (`/issues`)
   - View reported issues with status tracking
   - Submit a new issue (optional)
   - Filter by priority and status

5. **Review Impact Metrics** (`/impact`)
   - See environmental impact calculations
   - View department leaderboards
   - Understand sustainability scoring

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (React)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Authentication**: Clerk
- **AI Analysis**: Google Gemini API
- **Charts**: Recharts
- **Icons**: Lucide React

---

## 📱 Responsive Design

The application is fully responsive:
- **Desktop**: Full sidebar navigation
- **Mobile/Tablet**: Collapsible mobile menu with hamburger icon

---

## 🔑 Authentication

- Sign up/Sign in functionality via Clerk
- User profiles with email display
- Secure session management

---

## 🌟 Unique Selling Points

1. **AI-Powered Tree Health Analysis** - Automated assessment using computer vision
2. **Gamification** - Department leaderboards encourage participation
3. **Real-Time Tracking** - Live updates on sustainability metrics
4. **Comprehensive Platform** - Trees + Civic Issues + Impact in one place
5. **Campus-Specific** - Designed for college/university environments

---

## 📊 Sample Data

The prototype includes realistic mock data to demonstrate:
- 1,247 trees monitored
- 89% survival rate
- 24,560 liters of water saved
- 42 civic issues (28 resolved, 14 open)
- Green Score: 87/100

---

## 🎨 Design Highlights

- **Modern UI**: Clean, professional interface with consistent design system
- **Data Visualization**: Interactive charts and graphs
- **Status Indicators**: Color-coded badges for quick status recognition
- **Accessibility**: High contrast, readable fonts, semantic HTML

---

## 📞 Support

For questions or issues during evaluation, please refer to:
- **DEMO_GUIDE.md** - Detailed walkthrough with screenshots
- **Code Documentation** - Inline comments in source files

---

## 🏆 Hackathon Context

This is a prototype developed for a sustainability-focused hackathon, demonstrating how technology can drive measurable environmental impact on college campuses.

**Built with ❤️ for a greener future**