from fastapi import FastAPI
from router import speech_api

app= FastAPI

# app.include_router(speech_api.router)

@app.get("/")
async def get():
    return "HI I am Bless who is more than assistant "