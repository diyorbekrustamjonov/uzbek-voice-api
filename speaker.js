const { SpeechSynthesisOutputFormat, SpeechConfig, SpeechSynthesizer} = require("microsoft-cognitiveservices-speech-sdk");

require('dotenv').config();

const fs = require('fs');
const path = require('path');

async function ovozchiFun({text="Hammaga salom", audiolang="uz-UZ", audioLangSpeaker="uz-UZ-MadinaNeural", audioFormat = 'wav', audioOutputPath="tts"}, res) {
    const speechConfig = SpeechConfig.fromSubscription(process.env.SUBSCRIPTION_KEY, process.env.REGION);
    speechConfig.speechSynthesisOutputFormat = SpeechSynthesisOutputFormat.Audio24Khz160KBitRateMonoMp3;



    // uz-UZ => uz-UZ-MadinaNeural, uz-UZ-SardorNeural
    // ru-RU => ru-RU-DariyaNeural, ru-RU-SvetlanaNeural, ru-RU-DmitryNeural
    speechConfig.speechSynthesisLanguage = audiolang;
    speechConfig.speechSynthesisVoiceName = audioLangSpeaker;

    const synthesizer = new SpeechSynthesizer(speechConfig);

    synthesizer.speakTextAsync( text, (result) => {
            const audio = result.audioData;
            synthesizer.close();
            const buffer = Buffer.from(audio);
            fs.writeFileSync(path.resolve(__dirname, audioOutputPath + "." + audioFormat), buffer, 'base64');
            res(buffer)
            },
        (error) => {
                console.log(error);
            },
    );
}


module.exports = ovozchiFun;