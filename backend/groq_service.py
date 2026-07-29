import json
import os
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables
load_dotenv()

# Groq Client
client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1"
)


def analyze_resume(resume_text):
    prompt = f"""
You are an expert ATS Resume Analyzer and HR Interviewer.

Analyze the following resume and return ONLY valid JSON.

Use this exact format:

Use this exact format:

{{
    "ats_score": 0,
    "strengths": [],
    "weaknesses": [],
    "missing_skills": [],
    "suggestions": [],
    "interview_questions": [],
    "job_match": [
        {{
            "company": "TCS",
            "score": 0
        }}
    ],
    "analytics": {{
        "skills": 0,
        "projects": 0,
        "experience": 0,
        "education": 0,
        "resume_format": 0
    }}
}}
        {{
            "company": "TCS",
            "score": 0
        }}
    ]
}}
Rules:
- ats_score must be a number between 0 and 100.
- strengths should contain 4 to 6 points.
- weaknesses should contain 3 to 5 points.
- missing_skills should contain 3 to 5 skills.
- suggestions should contain 4 to 6 suggestions.
- interview_questions should contain exactly 10 interview questions based on the resume.
- analytics should contain realistic scores (0 to 100) for skills, projects, experience, education, and resume_format based on the resume.
- job_match should contain these companies:
  - TCS
  - Infosys
  - Accenture
  - Capgemini
  - Cognizant
  - Wipro
  - Amazon
  - Google
  - Microsoft

- Each company should have:
  - company
  - score

- score must be between 50 and 100 based on how well the resume matches that company.
- Return ONLY valid JSON.
- Do NOT use markdown.
- Do NOT use ```json.
- Do NOT write any explanation outside the JSON.

Resume:

{resume_text}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.3,
    )


    result = response.choices[0].message.content.strip()

    try:
        return json.loads(result)

    except json.JSONDecodeError:
        return {
            "ats_score": 0,
            "strengths": [],
            "weaknesses": [],
            "missing_skills": [],
            "suggestions": [],
            "interview_questions": [],
            "job_match": [],
            "error": "Invalid JSON returned by AI",
            "raw_response": result,
        }