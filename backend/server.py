from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List
from models import ContactRequest, ContactRequestCreate

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "ORBITALDATA API - Hello World"}

@api_router.post("/contact-requests", response_model=ContactRequest, status_code=201)
async def create_contact_request(request: ContactRequestCreate):
    try:
        # Create ContactRequest object
        contact_request = ContactRequest(
            name=request.name,
            email=request.email,
            message=request.message
        )
        
        # Convert to dict for MongoDB
        request_dict = contact_request.dict()
        
        # Insert into MongoDB
        result = await db.contact_requests.insert_one(request_dict)
        
        if not result.inserted_id:
            raise HTTPException(status_code=500, detail="Error al guardar la solicitud")
        
        logging.info(f"Contact request created: {contact_request.id}")
        return contact_request
        
    except Exception as e:
        logging.error(f"Error creating contact request: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error al procesar la solicitud: {str(e)}")

@api_router.get("/contact-requests", response_model=List[ContactRequest])
async def get_contact_requests():
    try:
        # Fetch all contact requests from MongoDB
        requests = await db.contact_requests.find().sort("created_at", -1).to_list(1000)
        
        # Convert MongoDB documents to ContactRequest objects
        contact_requests = []
        for req in requests:
            # Remove MongoDB _id field
            req.pop('_id', None)
            contact_requests.append(ContactRequest(**req))
        
        return contact_requests
        
    except Exception as e:
        logging.error(f"Error fetching contact requests: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error al obtener solicitudes: {str(e)}")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()