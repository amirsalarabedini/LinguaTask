from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime


class UserBase(BaseModel):
    username: str
    email: str
    

class UserCreate(UserBase):
    password: str


class UserUpdate(BaseModel):
    email: Optional[str] = None
    password: Optional[str] = None
    disabled: Optional[bool] = None


class UserInDB(UserBase):
    id: int
    disabled: bool
    created_at: datetime
    hashed_password: str
    
    class Config:
        orm_mode = True


class User(UserBase):
    id: int
    disabled: bool
    created_at: datetime
    
    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None