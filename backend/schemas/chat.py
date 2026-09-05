"""
Pydantic Schemas for CardioAI Assistant Chat API
"""

from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field


class ChatMessageHistoryItem(BaseModel):
    role: str = Field(..., description="Role of the message author: 'user' or 'assistant'")
    content: str = Field(..., description="Message text content")


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=2000, description="User question or prompt")
    history: Optional[List[ChatMessageHistoryItem]] = Field(default=[], description="Recent conversation turns")
    page_context: Optional[str] = Field(default="/", description="Current URL path or page identifier")


class ChatAction(BaseModel):
    label: str = Field(..., description="Call-to-action button text")
    route: str = Field(..., description="Target React application route")


class ChatResponse(BaseModel):
    response: str = Field(..., description="AI-generated message text with markdown formatting")
    suggestions: List[str] = Field(default=[], description="Suggested follow-up questions")
    action: Optional[ChatAction] = Field(default=None, description="Optional navigation action button")
