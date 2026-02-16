# How to Fix "Email not confirmed" & "Rate limit exceeded"

The errors you are seeing are default security settings in Supabase. Here is how to fix them for your development environment:

## 1. Fix "Email not confirmed"
By default, Supabase requires you to verify your email before logging in. You can disable this for development:

1.  Go to your **[Supabase Dashboard](https://supabase.com/dashboard)**.
2.  Select your project (`rootsense`).
3.  In the left sidebar, click **Authentication**.
4.  Click on **Providers**.
5.  Click on **Email**.
6.  **Toggle OFF** "Confirm email".
7.  Click **Save**.

*Note: For existing users who are already "unconfirmed", you may need to delete them and sign up again, or manually click "Confirm" in the Users table.*

## 2. Fix "Email rate limit exceeded"
This happens when you try to sign up too many times quickly.

1.  Wait about 15-60 minutes for the limit to reset.
2.  Or, in **Authentication** > **Rate Limits**, you can increase the limits, but on the free tier, this might be restricted.
3.  **Best Practice**: Once you disable "Confirm email" (step 1 above), you won't need to sign up as repeatedly to test things.
