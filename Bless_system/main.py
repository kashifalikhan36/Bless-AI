from AI import Ai_assistent
from speech import Ai_assis

api_key="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"

AI=Ai_assistent(api_key)
user_and_ai=Ai_assis()
while True:
    text_output=user_and_ai.recognize_from_microphone()
    language_detector=AI.Language_detect(text_output)
    Ai_Listen_you=AI.Assistent_listen(text_output)
    user_and_ai.text_to_speech(Ai_Listen_you,language_detector)