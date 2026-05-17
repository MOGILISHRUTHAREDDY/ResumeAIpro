# ResumeAI Pro

A smart, full-stack resume builder with AI-powered suggestions. Built with React (Vite), Tailwind CSS, Node.js, Express, MongoDB, and OpenAI.

## Features
- **Live Preview:** See your resume update in real-time as you type.
- **AI Assistant:** Get a score out of 10 and role-specific improvement suggestions.
- **Dark/Light Mode:** Seamless theme switching.
- **PDF Export:** Download your polished resume as a PDF in one click.

## Folder Structure
- `/frontend` - React application (Vite)
- `/backend` - Express API server

## Prerequisites
- Node.js (v16+)
- MongoDB (Local or Atlas URL)
- OpenAI API Key

## Setup Instructions

### 1. Backend Setup
1. Navigate to the backend directory:
   \`\`\`bash
   cd backend
   \`\`\`
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Configure Environment Variables:
   Open \`backend/.env\` and add your keys:
   \`\`\`env
   PORT=5001
   MONGODB_URI=mongodb://127.0.0.1:27017/resumeAIpro
   OPENAI_API_KEY=your_openai_api_key_here
   \`\`\`
   *(Make sure MongoDB is running if using a local instance)*
4. Start the server:
   \`\`\`bash
   npm start
   \`\`\`
   *(Or \`node server.js\`)*

### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   \`\`\`bash
   cd frontend
   \`\`\`
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`
4. Open your browser and navigate to \`http://localhost:5173\` (or the port Vite provides).

## Using the AI Assistant
1. Fill in your resume details.
2. On the middle column ("AI Assistant"), type your target role (e.g., "Full Stack Developer").
3. Click "Analyze Resume". The AI will score your resume and provide actionable feedback based on the content you entered.

## Tech Stack
- **Frontend:** React, Tailwind CSS, Lucide React, Axios, HTML2PDF.
- **Backend:** Node.js, Express, Mongoose.
- **AI:** OpenAI GPT-3.5 Turbo.
