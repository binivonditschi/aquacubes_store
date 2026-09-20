# Aquacubes

## How to run this project

1. Install dependencies
   ```
   npm install
   ```

2. Set up your environment file (only needed once)
   ```
   copy .env.example .env
   ```
   Then open `.env` and add a real Stripe test secret key from https://dashboard.stripe.com/test/apikeys

3. Set up the database (only needed once)
   ```
   npx prisma generate
   npx prisma db push
   ```

4. Start the app
   ```
   npm run dev
   ```

5. Open in your browser
   ```
   http://localhost:3000
   ```

To stop the app, go back to the terminal and press `Ctrl + C`.
