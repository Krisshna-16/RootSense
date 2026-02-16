# Setting Up Clerk Authentication

To fix the "Publishable key not valid" error and get your login working, you need to get your unique API keys from Clerk.

## 1. Create a Free Account
1.  Go to **[https://clerk.com/sign-up](https://clerk.com/sign-up)**.
2.  Sign up with your GitHub account or Email.

## 2. Create Your Application
1.  Once logged in, you'll see a **"Create Application"** card (or button). Click it.
2.  **Name your app**: `RootSense`
3.  **Select Authentication methods**:
    *   Ensure **Email** is selected.
    *   Ensure **Google** is selected.
    *   (You can uncheck "Phone" or others if you don't want them).
4.  Click **"Create Application"**.

## 3. Get Your Keys
1.  You will be redirected to your dashboard home.
2.  Look for a section called **"API Keys"** or **"Quickstart"**.
3.  You will see two keys:
    *   **Publishable Key**: Starts with `pk_test_...`
    *   **Secret Key**: Starts with `sk_test_...`
4.  Copy these keys.

## 4. Add Keys to Your Project
1.  Open the file `.env.local` in your project folder.
2.  Paste your keys in place of the placeholders:

    ```env
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_ACTUAL_KEY_HERE
    CLERK_SECRET_KEY=sk_test_YOUR_ACTUAL_KEY_HERE
    ```

3.  **Save the file.**

## 5. Restart
1.  Go to your terminal.
2.  Stop the server (`Ctrl + C`).
3.  Run `npm run dev` again.
