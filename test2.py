from langdetect import detect

text = "थो मुझे ये बताओ की आज कल क्या चल रहा है?"
language = detect(text)
print(language)