from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import json

from database import get_db
from models.models import Task, User
from schemas.task import CaptionInput, SummaryInput, TranslationInput, TaskOutput, Task as TaskSchema
from utils.dependencies import get_current_active_user
from utils.openai import get_openai_response

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.post("/caption", response_model=TaskOutput)
async def generate_caption(input_data: CaptionInput, 
                          current_user: User = Depends(get_current_active_user),
                          db: Session = Depends(get_db)):
    """Generate a creative caption"""
    prompt = f"Generate a creative caption for an {input_data.topic}. Additional context: {input_data.input_text}"
    result = await get_openai_response(prompt, model_name=input_data.model_name, provider=input_data.provider)
    
    # Save task to database
    metadata = json.dumps({"topic": input_data.topic, "model_name": input_data.model_name, "provider": input_data.provider})
    db_task = Task(
        task_type="caption",
        input_text=input_data.input_text,
        output_text=result,
        task_metadata=metadata,
        user_id=current_user.id
    )
    db.add(db_task)
    db.commit()
    
    return {"output_text": result}


@router.post("/summary", response_model=TaskOutput)
async def summarize_text(input_data: SummaryInput, 
                        current_user: User = Depends(get_current_active_user),
                        db: Session = Depends(get_db)):
    """Summarize text"""
    prompt = f"Summarize the following text in a concise way: {input_data.input_text}"
    result = await get_openai_response(prompt, model_name=input_data.model_name, provider=input_data.provider)
    
    # Save task to database
    metadata = json.dumps({"model_name": input_data.model_name, "provider": input_data.provider})
    db_task = Task(
        task_type="summary",
        input_text=input_data.input_text,
        output_text=result,
        task_metadata=metadata,
        user_id=current_user.id
    )
    db.add(db_task)
    db.commit()
    
    return {"output_text": result}


@router.post("/translation", response_model=TaskOutput)
async def translate_text(input_data: TranslationInput, 
                        current_user: User = Depends(get_current_active_user),
                        db: Session = Depends(get_db)):
    """Translate text"""
    prompt = f"Translate the following text to {input_data.target_language}: {input_data.input_text}"
    result = await get_openai_response(prompt, model_name=input_data.model_name, provider=input_data.provider)
    
    # Save task to database
    metadata = json.dumps({"target_language": input_data.target_language, "model_name": input_data.model_name, "provider": input_data.provider})
    db_task = Task(
        task_type="translation",
        input_text=input_data.input_text,
        output_text=result,
        task_metadata=metadata,
        user_id=current_user.id
    )
    db.add(db_task)
    db.commit()
    
    return {"output_text": result}


@router.get("/history", response_model=list[TaskSchema])
async def get_task_history(current_user: User = Depends(get_current_active_user),
                          db: Session = Depends(get_db)):
    """Get user's task history"""
    tasks = db.query(Task).filter(Task.user_id == current_user.id).order_by(Task.created_at.desc()).all()
    return tasks