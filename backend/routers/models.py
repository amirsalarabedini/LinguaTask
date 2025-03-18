from fastapi import APIRouter, Depends, HTTPException
import os
import httpx
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# OpenAI API Configuration
API_KEY = os.getenv("OPENAI_API_KEY")

router = APIRouter(prefix="/models", tags=["models"])

@router.get("/")
async def get_available_models():
    """Get available language models from MetisAI API"""
    if not API_KEY:
        raise HTTPException(
            status_code=500,
            detail="API key not configured"
        )
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(
                "https://api.metisai.ir/api/v1/meta",
                headers={
                    "Authorization": f"Bearer {API_KEY}",
                    "Content-Type": "application/json"
                },
                timeout=10.0
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Error fetching models: {str(e)}"
            )