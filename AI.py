import openai
import json
class Ai_assistent:
    
    def __init__(self,API_KEY):
        openai.api_key = API_KEY
        data=""
        with open('data/ai_train.json','r') as file:
            data = json.load(file)
        self.messages=data
        self.text_identifier=[{"role": "system", "content": 'Ignore all the instructions you got before. From now on, you are going to act as Language detector. I would like you to simulate as language detector where whenever i said something to u you have need to give result as that "hi" which stands for Hindi or "en" and which stands for English. as example:-user said:-"kya haal h yrr"   then u reply:- "hi"    if user said:-"whats going on?" then u reply:- "en"'}]
        
    def Assistent_listen(self,data):
        self.messages.append(
            {"role": "user", "content": data},
        )

        chat = openai.ChatCompletion.create(
            model="gpt-3.5-turbo-16k", messages=self.messages
        )

        prompt = chat.choices[0].message.content

        self.messages.append({"role": "assistant", "content": prompt})
        with open('data/ai_train.json',"w") as file:
            json.dump(self.messages, file)
        return prompt
    
    def Language_detect(self,data):

        self.text_identifier.append(
            {"role": "user", "content": data},
        )

        chat = openai.ChatCompletion.create(
            model="gpt-3.5-turbo-16k", messages=self.text_identifier
        )

        prompt = chat.choices[0].message.content

        self.text_identifier=[{"role": "system", "content": 'Ignore all the instructions you got before. From now on, you are going to act as Language detector. I would like you to simulate as language detector where whenever i said something to u you have need to give result as that "hi" which stands for Hindi or "en" and which stands for English. as example:-user said:-"kya haal h yrr"   then u reply:- "hi"    if user said:-"whats going on?" then u reply:- "en"'}]
        return prompt