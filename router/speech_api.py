from fastapi import APIRouter

router = APIRouter(prefix='/speech_api', tags=['Bless_Voice_Talent'])

@router.get('/get_voice')
async def get_voice():
    return "voice"