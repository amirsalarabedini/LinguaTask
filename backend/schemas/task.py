from pydantic import BaseModel
from typing import Optional
from datetime import datetime
import json


class TaskBase(BaseModel):
    input_text: str
    model_name: str = "gpt-4o-mini"
    provider: str = "openai_chat_completion"


class CaptionInput(TaskBase):
    topic: str


class SummaryInput(TaskBase):
    pass


class TranslationInput(TaskBase):
    target_language: str


class TaskCreate(BaseModel):
    task_type: str  # caption, summary, translation
    input_text: str
    task_metadata: Optional[str] = None  # JSON string for additional data


class TaskOutput(BaseModel):
    output_text: str


class Task(TaskBase):
    id: int
    task_type: str
    output_text: str
    task_metadata: Optional[str] = None
    created_at: datetime
    user_id: int
    
    class Config:
        orm_mode = True
        
    def get_metadata_dict(self):
        """Convert task_metadata JSON string to dictionary"""
        if not self.task_metadata:
            return {}
        try:
            return json.loads(self.task_metadata)
        except:
            return {}