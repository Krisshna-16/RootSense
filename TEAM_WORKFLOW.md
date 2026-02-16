# RootSense - Project Workflow & Architecture

This guide explains how the **RootSense** application works conceptually. Use this to understand the flow of data and user interaction.

## 🏗️ High-Level Architecture

RootSense connects a modern frontend (Next.js) with two powerful backend services:
1.  **Clerk**: Handles who is allowed in (Identity & Access).
2.  **Supabase**: Stores all the data (Trees, Issues, Metrics).

---

## � User Journey & Data Flow

### 1. Authentication (The Gatekeeper)
*   **Flow**: User lands on `Home` -> Clicks `Sign In` -> Redirected to **Clerk** hosted page.
*   **Success**: Clerk verifies email/password or Google account -> Redirects back to `/dashboard`.
*   **Protection**: If a user tries to visit `/dashboard` without logging in, the **Middleware** blocks them and kicks them back to Sign In.

### 2. The Dashboard (Mission Control)
*   **Purpose**: Immediate visibility into campus sustainability.
*   **Data Source**: Fetches aggregated data from **Supabase** (e.g., Total trees count, active issues).
*   **Logic**:
    *   Checks if user is authenticated.
    *   Queries `trees` table for count and survival rates.
    *   Queries `civic_issues` table for pending reports.

### 3. Tree Tracking Module
*   **Goal**: Monitor the health of individual trees on campus.
*   **Workflow**:
    *   **View**: Users see a list/map of trees. Data comes from Supabase `trees` table.
    *   **Add/Update**: Users upload a photo & details.
    *   **AI Analysis**: (Future/Beta) The photo is sent to Gemini AI to auto-detect health status before saving to Supabase.

### 4. Civic Issues Reporting
*   **Goal**: Crowdsource maintenance issues (broken sprinklers, waste, etc.).
*   **Workflow**:
    *   User snaps a picture of a problem.
    *   Submits a report.
    *   Data is saved to `civic_issues` in Supabase.
    *   Admin/Staff can view these on the Dashboard to take action.

---

## 🎨 Frontend Architecture

RootSense is built with a modern, performance-first frontend stack.

### 1. Technology Stack
*   **Framework**: [Next.js 14+](https://nextjs.org) (App Router) - We use Server Components for performance and Client Components for interactivity.
*   **Styling**: [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS. No separate `.css` files (except global).
*   **UI Components**: [Shadcn UI](https://ui.shadcn.com) - Reusable components built on Radix Primitives. Accessible and customizable.
*   **Icons**: [Lucide React](https://lucide.dev) - Consistent, clean SVG icons.

### 2. Key Pages & Routes
*   **Landing Page (`/`)**: Public-facing marketing page. Explains value proposition.
*   **Auth Pages (`/sign-in`, `/sign-up`)**: Managed by Clerk.
*   **Dashboard (`/dashboard`)**: usage stats, protected route.
*   **Feature Pages**:
    *   `/trees`: Tree inventory and health tracking.
    *   `/issues`: Civic issue reporting form and list.
    *   `/impact`: Data visualization of environmental impact.

### 3. Design System
*   **Theme**: Dark/Light mode support (system default).
*   **Colors**: Semantic naming (e.g., `bg-primary`, `text-muted-foreground`) to allow easy theming.
*   **Layout**:
    *   `app/layout.tsx`: Root layout (fonts, providers, analytics).
    *   `(app)/layout.tsx`: Dashboard layout (sidebar, authenticated navigation).

---

## 🛠️ Technology Stack (The "Why")

*   **Next.js (App Router)**: The framework that holds everything together. It renders pages fast and handles routing.
*   **Clerk**: Chosen for secure, pre-built login flows (ignoring the complexity of building auth from scratch).
*   **Supabase**: Chosen because it gives us a real SQL database (PostgreSQL) that is easy to talk to from the frontend.
*   **Tailwind CSS**: Used for all styling (making it look good).

---

## 🚀 How to Contribute

1.  **Pick a Feature**: Decide if you are working on *Trees*, *Issues*, or *UI*.
2.  **Check Auth**: Ensure you can log in locally.
3.  **Build**:
    *   If adding a page, create it in `app/`.
    *   If fetching data, use the `supabase` client in `lib/`.
## 🚀 Deployment

We will deploy the frontend to **Vercel**, as it creators of Next.js and offers the best integration.

### Steps to Deploy
1.  **Push to GitHub**: Ensure all your code is pushed to the `main` branch.
2.  **Import to Vercel**:
    *   Go to Vercel Dashboard -> "Add New..." -> "Project".
    *   Select the `root-sense` repository.
3.  **Environment Variables**:
    *   Copy *all* the content from your `.env.local` file.
    *   Paste them into the Vercel "Environment Variables" section during setup.
4.  **Deploy**: Click "Deploy". Vercel will build the app and give you a live URL (e.g., `rootsense.vercel.app`).

### Backend & Auth
*   **Clerk**: Go to Clerk Dashboard -> "Production" path to get production keys (different from `pk_test_`). Update Vercel env vars with these.
*   **Supabase**: works automatically as long as the URL/Key env vars are set in Vercel.
