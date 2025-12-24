# Get your site roasted by AI
Uses Grok 4.1 fast to get the best insults. Check it out at: https://roast.appwrite.network

## Self-Hosting
Idk why you would but here is a guid:
Clone the repo
```bash
git clone https://github.com/prathamghaywati/roast.git
cd roast
```

Install dependencies
```bash
npm install
```
Set up environment variables
Create a `.env.local` file in the root directory and add your AI and Appwrite credentials:
```
NEXT_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_appwrite_project_id
AI_BASE_URL=your_ai_base_url
AI_API_KEY=your_ai_api_key
```

Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser
to see the result.
