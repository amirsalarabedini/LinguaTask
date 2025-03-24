# LinguaTask

LinguaTask is an AI-powered language processing application that helps users with various text-based tasks including caption generation, text summarization, and translation.

## Features

- **Caption Generator**: Create engaging captions for social media posts
- **Text Summarizer**: Generate concise summaries of long texts
- **Translator**: Translate text between different languages
- **Task History**: View and manage your previous language tasks
- **User Authentication**: Secure login and registration system

## Tech Stack

### Backend
- **FastAPI**: Modern, high-performance web framework for building APIs
- **SQLAlchemy**: SQL toolkit and ORM
- **JWT Authentication**: Secure token-based authentication
- **OpenAI Integration**: AI-powered language processing

### Frontend
- **React**: JavaScript library for building user interfaces
- **Material UI**: React component library implementing Google's Material Design
- **React Router**: Navigation for single page applications
- **Axios**: Promise-based HTTP client

## Installation

### Prerequisites
- Node.js (v14+)
- Python (v3.8+)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file based on `.env.example` and set your environment variables:
   ```
   OPENAI_API_KEY=your_openai_api_key
   SECRET_KEY=your_secret_key_for_jwt
   DATABASE_URL=sqlite:///./linguatask.db  # Default SQLite database
   ```

5. Start the backend server:
   ```bash
   uvicorn main:app --reload
   ```
   The API will be available at http://localhost:8000

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```
   The application will be available at http://localhost:3000

## API Documentation

Once the backend server is running, you can access the interactive API documentation at:

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Available Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get access token

### Tasks
- `POST /tasks/caption` - Generate a creative caption
- `POST /tasks/summary` - Summarize text
- `POST /tasks/translation` - Translate text
- `GET /tasks/history` - Get user's task history

## License

This project is licensed under the MIT License - see the LICENSE file for details.