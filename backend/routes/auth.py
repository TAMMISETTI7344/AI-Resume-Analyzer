from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database import db

router = APIRouter()

users_collection = db["users"]


class RegisterUser(BaseModel):
    name: str
    email: str
    password: str


class LoginUser(BaseModel):
    email: str
    password: str


@router.post("/register")
def register(user: RegisterUser):
    existing_user = users_collection.find_one({"email": user.email})

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already exists")

    users_collection.insert_one(user.dict())

    return {
        "message": "User Registered Successfully"
    }


@router.post("/login")
def login(user: LoginUser):
    existing_user = users_collection.find_one({"email": user.email})

    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")

    if existing_user["password"] != user.password:
        raise HTTPException(status_code=401, detail="Invalid password")

    return {
        "message": "Login Successful",
        "user": {
            "name": existing_user["name"],
            "email": existing_user["email"]
        }
    }