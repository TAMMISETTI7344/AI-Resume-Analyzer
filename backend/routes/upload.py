from fastapi import APIRouter, UploadFile, File
from resume_parser import extract_text_from_pdf
from groq_service import analyze_resume
import os

router = APIRouter()

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    try:
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)

        with open(file_path, "wb") as f:
            f.write(await file.read())

        resume_text = extract_text_from_pdf(file_path)
        analysis = analyze_resume(resume_text)

        return {
            "message": "Resume Uploaded Successfully",
            "filename": file.filename,
            "analysis": analysis
        }

    except Exception as e:
        print("UPLOAD ERROR:", e)
        return {"error": str(e)}