import azure.cognitiveservices.speech as speechsdk
class Ai_assis():
    def __init__(self):
        pass
    def recognize_from_microphone(self):
        # This example requires environment variables named "SPEECH_KEY" and "SPEECH_REGION"
        speech_translation_config = speechsdk.translation.SpeechTranslationConfig(subscription='fee2c30135b64dc2bf7df3f0f805abad', region='centralindia')

        speech_translation_config.speech_recognition_language="hi-IN"
        speech_translation_config.speech_recognition_language="en-IN"

        target_language="hi"
        speech_translation_config.add_target_language(target_language)

        audio_config = speechsdk.audio.AudioConfig(use_default_microphone=True)
        translation_recognizer = speechsdk.translation.TranslationRecognizer(translation_config=speech_translation_config, audio_config=audio_config)

        # print("Speak into your microphone.")
        translation_recognition_result = translation_recognizer.recognize_once_async().get()

        if translation_recognition_result.reason == speechsdk.ResultReason.TranslatedSpeech:
            print("Recognized: {}".format(translation_recognition_result.text))
            print("""Translated into '{}': {}""".format(
                target_language, 

                translation_recognition_result.translations[target_language]))
            return translation_recognition_result.translations[target_language]
        elif translation_recognition_result.reason == speechsdk.ResultReason.NoMatch:
            print("No speech could be recognized: {}".format(translation_recognition_result.no_match_details))
        elif translation_recognition_result.reason == speechsdk.ResultReason.Canceled:
            cancellation_details = translation_recognition_result.cancellation_details
            print("Speech Recognition canceled: {}".format(cancellation_details.reason))
            if cancellation_details.reason == speechsdk.CancellationReason.Error:
                print("Error details: {}".format(cancellation_details.error_details))
                print("Did you set the speech resource key and region values?")

    def text_to_speech(self,text):
        # This example requires environment variables named "SPEECH_KEY" and "SPEECH_REGION"
        speech_config = speechsdk.SpeechConfig(subscription='fee2c30135b64dc2bf7df3f0f805abad', region='centralindia')
        audio_config = speechsdk.audio.AudioOutputConfig(use_default_speaker=True)

        # The language of the voice that speaks.
        speech_config.speech_synthesis_voice_name='en-US-SaraNeural'

        speech_synthesizer = speechsdk.SpeechSynthesizer(speech_config=speech_config, audio_config=audio_config)

        # Get text from the console and synthesize to the default speaker.

        speech_synthesis_result = speech_synthesizer.speak_text_async(text).get()

        if speech_synthesis_result.reason == speechsdk.ResultReason.SynthesizingAudioCompleted:
            print("{}".format(text))
            with open("./audios/output_audio.wav", "wb") as audio_file:
                audio_file.write(speech_synthesis_result.audio_data)
            print("\n\nAudio saved to output_audio.wav")
        elif speech_synthesis_result.reason == speechsdk.ResultReason.Canceled:
            cancellation_details = speech_synthesis_result.cancellation_details
            print("Speech synthesis canceled: {}".format(cancellation_details.reason))
            if cancellation_details.reason == speechsdk.CancellationReason.Error:
                if cancellation_details.error_details:
                    print("Error details: {}".format(cancellation_details.error_details))
                    print("Did you set the speech resource key and region values?")