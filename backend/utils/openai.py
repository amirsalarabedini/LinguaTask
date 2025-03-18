import os
import httpx
from fastapi import HTTPException
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# OpenAI API Configuration
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")


async def get_openai_response(prompt, model_name="gpt-4o-mini", provider="openai_chat_completion", max_tokens=500):
    """Get a response from OpenAI API"""
    if not OPENAI_API_KEY:
        raise HTTPException(
            status_code=500,
            detail="OpenAI API key not configured"
        )
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                f"https://api.metisai.ir/api/v1/wrapper/{provider}/chat/completions",
                headers={
                    "Authorization": f"Bearer {OPENAI_API_KEY}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": model_name,
                    "messages": [{"role": "user", "content": prompt}],
                    "max_tokens": max_tokens
                },
                timeout=30.0
            )
            response.raise_for_status()
            return response.json()["choices"][0]["message"]["content"]
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Error calling OpenAI API: {str(e)}"
            )