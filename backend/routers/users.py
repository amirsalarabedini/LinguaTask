from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database import get_db
from models.models import User
from schemas.user import User as UserSchema, UserUpdate
from utils.dependencies import get_current_active_user

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/me", response_model=UserSchema)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    """Get current user profile"""
    return current_user


@router.put("/me", response_model=UserSchema)
async def update_user(user_update: UserUpdate, 
                     current_user: User = Depends(get_current_active_user),
                     db: Session = Depends(get_db)):
    """Update current user profile"""
    db_user = db.query(User).filter(User.id == current_user.id).first()
    
    # Update user fields if provided
    if user_update.email is not None:
        db_user.email = user_update.email
    if user_update.disabled is not None:
        db_user.disabled = user_update.disabled
    
    db.commit()
    db.refresh(db_user)
    return db_user