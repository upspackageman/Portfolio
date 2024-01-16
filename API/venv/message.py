from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import smtplib

app = FastAPI()

class EmailPayload(BaseModel):
    name: str
    message: str
    email: str

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://207.246.108.92","http://207.246.108.92","https://207.246.108.92"],  # You may want to restrict this to specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.post("/send-email/")
async def send_email(payload: EmailPayload):
    name = payload.name
    to = 'wward246@gmail.com'
    subject = name
    message = payload.message
    _from = payload.email
    print(_from)
    if not all([to, subject, message]):
        raise HTTPException(status_code=400, detail="Fields (email: {_from}, subject {name}, message {message}) may be missing")

    # Your email configuration
    smtp_server = 'smtp.gmail.com'
    smtp_port = 587
    smtp_username = 'wward246@gmail.com'
    smtp_password = 'sjft rltb bwdt tvvj'
    sender_email =  _from
    print(sender_email)
    # Create the email message
    msg = MIMEMultipart()
    msg['From'] = _from
    msg['To'] = to
    msg['Subject'] = 'Portfolio Inquiry: '+subject 
    print(msg['From'])
    msg.attach(MIMEText(message, 'plain'))

    try:
        # Connect to the SMTP server
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            # Log in to the SMTP server
            server.starttls()
            server.login(smtp_username, smtp_password)

            # Send the email
            server.sendmail(sender_email, to, msg.as_string())

        return JSONResponse(content={"message": "Email sent successfully"}, status_code=200)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send email: {str(e)}")
