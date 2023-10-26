import openai
import json
class Ai_assistent:
    
    def __init__(self,API_KEY):
        openai.api_key = API_KEY
        data=""
        with open('data/ai_train.json','r') as file:
            data = json.load(file)
        self.messages=data
    def Assistent_listen(self,discription_image):
        self.messages.append(
            {"role": "user", "content": discription_image},
        )

        chat = openai.ChatCompletion.create(
            model="gpt-3.5-turbo-16k", messages=self.messages
        )

        prompt = chat.choices[0].message.content

        self.messages.append({"role": "assistant", "content": prompt})
        with open('data/ai_train.json',"w") as file:
            json.dump(self.messages, file)
        return prompt