# 🚀 RootSense - Quick Navigation Reference

**Print this page or keep it open during demo evaluation**

---

## 📍 Application URL
```
http://localhost:3000
```

---

## 🗺️ Page Navigation Map

### 1. 🏠 HOME PAGE
**URL:** `/` or `http://localhost:3000`

**What's Here:**
- Landing page with project overview
- Feature descriptions
- Statistics showcase
- Sign In/Sign Up buttons

**Click to Navigate:**
- "Sign In" button → `/sign-in`
- "Go to Dashboard" → `/dashboard`
- "View Tree Data" → `/trees`
- Sidebar links (desktop) or hamburger menu (mobile)

---

### 2. 📊 DASHBOARD
**URL:** `/dashboard` or `http://localhost:3000/dashboard`

**What's Here:**
- 4 metric cards (Trees, Issues, Water, Green Score)
- Tree Health Trend chart (6 months)
- Weekly Activity chart (7 days)
- Recent Activity feed (8 items)

**Key Numbers:**
- Trees: 1,247
- Issues: 42 (28 resolved, 14 open)
- Water Saved: 24,560 liters
- Green Score: 87/100

---

### 3. 🌲 TREES
**URL:** `/trees` or `http://localhost:3000/trees`

**What's Here:**
- Tree inventory with photos
- Health status indicators (Healthy/Moderate/Critical)
- Filter by health, location, species
- Upload new tree button
- AI-powered health analysis

**Try This:**
- Click "Upload Tree" to test AI analysis
- Use filters to sort trees
- View individual tree details

---

### 4. ⚠️ CIVIC ISSUES
**URL:** `/issues` or `http://localhost:3000/issues`

**What's Here:**
- Issue cards with photos
- Priority levels (Low/Medium/High/Critical)
- Status tracking (Open/In Progress/Resolved)
- Category tags (Irrigation, Waste, Infrastructure)
- Report new issue button

**Categories:**
- 💧 Irrigation
- 🗑️ Waste Management
- 🔧 Infrastructure
- 🌿 Environmental

---

### 5. 📈 IMPACT
**URL:** `/impact` or `http://localhost:3000/impact`

---

### 6. 🛡️ ADMIN
**URL:** `/admin` or `http://localhost:3000/admin`

**What's Here:**
- User management and roles
- Content moderation (tree approvals)
- System settings and AI config
- Analytics overview

**Try This:**
- Switch between Users/Moderation tabs
- Check system health status
- Review pending approvals

**What's Here:**
- Environmental impact metrics
- Department leaderboards
- Water conservation stats
- Carbon offset calculations
- Green score breakdown

**Metrics:**
- Total trees planted
- Liters of water saved
- CO₂ offset (kg)
- Department rankings

---

## 🎯 Recommended Demo Flow

```
START → Home (/) 
         ↓
      Dashboard (/dashboard)
         ↓
      Trees (/trees) → Upload a tree photo
         ↓
      Issues (/issues) → View issue tracking
         ↓
      Impact (/impact) → See leaderboards
         ↓
      END
```

**Estimated Time:** 5-7 minutes for complete walkthrough

---

## 🖱️ How to Navigate

### Desktop (Screen width > 1024px)
- **Sidebar** on left side (always visible)
- Click any menu item to navigate
- User profile at bottom of sidebar

### Mobile/Tablet (Screen width < 1024px)
- **Hamburger menu** (☰) in top-left corner
- Tap to open navigation menu
- Tap any item to navigate
- Menu closes automatically after selection

---

## 🎨 Visual Indicators

### Health Status Colors
- 🟢 **Green** = Healthy
- 🟡 **Yellow** = Moderate concern
- 🔴 **Red** = Critical condition

### Issue Priority Colors
- 🟢 **Green** = Low priority
- 🟡 **Yellow** = Medium priority
- 🟠 **Orange** = High priority
- 🔴 **Red** = Critical priority

### Issue Status
- 🔵 **Blue** = Open
- 🟡 **Yellow** = In Progress
- 🟢 **Green** = Resolved

---

## ⚡ Quick Commands

### Start Application
```bash
npm run dev
```

### Open in Browser
```
http://localhost:3000
```

### Stop Application
```
Ctrl + C (in terminal)
```

---

## 📱 Test Responsive Design

### Desktop View
- Open at full screen (> 1024px width)
- Sidebar visible on left

### Tablet View
- Resize browser to ~768px width
- Mobile menu appears

### Mobile View
- Resize browser to ~375px width
- Compact mobile layout

**Or use browser DevTools:**
- Press `F12`
- Click device toolbar icon
- Select iPhone/iPad/etc.

---

## ✅ Feature Checklist

### Must-See Features
- [ ] Landing page hero section
- [ ] Dashboard metrics and charts
- [ ] Tree inventory with photos
- [ ] AI tree health analysis
- [ ] Civic issue reporting
- [ ] Department leaderboards
- [ ] Responsive mobile menu
- [ ] User authentication (Clerk)

### Interactive Elements
- [ ] Click navigation links
- [ ] Hover over chart data points
- [ ] Upload a tree photo
- [ ] Filter trees by status
- [ ] View issue details
- [ ] Check leaderboard rankings

---

## 🔑 Key Selling Points

1. **AI-Powered** - Gemini API for tree health analysis
2. **Comprehensive** - Trees + Issues + Impact in one platform
3. **Gamified** - Department leaderboards drive engagement
4. **Real-Time** - Live activity feed and metrics
5. **Responsive** - Works on all devices

---

## 📞 Need Help?

- **Detailed Guide:** See `DEMO_GUIDE.md`
- **Technical Info:** See `README.md`
- **Source Code:** Check `/app` and `/components` folders

---

**🌱 Built for a Greener Campus Future**

*Last Updated: February 2026*
