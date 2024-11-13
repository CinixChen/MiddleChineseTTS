// 引入 ONNX Runtime Web API
import * as ort from 'https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/ort.min.js';

async function loadModel() {
  // 載入模型
  const session = await ort.InferenceSession.create('https://huggingface.co/CinixChen/MiddleChineseTTS/blob/main/TTS3561_300K.onnx');
  return session;
}

// 模型載入初始化
let modelSession;
loadModel().then(session => {
  modelSession = session;
}).catch(error => {
  console.error("模型加載失敗：", error);
});

document.getElementById("generateAudio").addEventListener("click", async () => {
  const inputText = document.getElementById("inputText").value;
  if (!inputText) {
    alert("請輸入文本！");
    return;
  }

  // 進行推理
  const audioData = await generateAudioFromText(inputText);
  if (audioData) {
    playAudio(audioData);
  }
});

async function generateAudioFromText(text) {
  try {
    // 將輸入文本轉換為模型輸入張量
    const tensor = new ort.Tensor('string', [text]);

    // 執行推理
    const results = await modelSession.run({ input: tensor });

    // 假設模型輸出包含音頻數據
    const audioArray = results.output.data; // output 是模型的輸出名

    // 將數據轉換為 Uint8Array，生成音頻 Blob
    return new Uint8Array(audioArray);
  } catch (error) {
    console.error("推理錯誤：", error);
  }
}

function playAudio(audioData) {
  const audioBlob = new Blob([audioData], { type: 'audio/wav' });
  const audioUrl = URL.createObjectURL(audioBlob);
  const audioPlayer = document.getElementById("audioPlayer");
  
  audioPlayer.src = audioUrl;
  audioPlayer.hidden = false;
  audioPlayer.play();
}
