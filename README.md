# MiddleChineseTTS
中古漢語語音合成

當前內容都是ChatGPT寫的，還沒法用。之後會給弄好的。

當前模型放在這裏了：https://huggingface.co/CinixChen/MiddleChineseTTS/blob/main/TTS3561_300K.onnx

具體用法，可以參考vits2_pytorch項目。將其安裝並下載相關依賴後，下載這裏的TTS3561.json，然後可以使用vits2_pytorch的infer_onnx.py進行推理。

可能需要手動在vits2_pytorch的text/symbols.py中將以下兩個字符加到_letters_ipa那行裏：

̈

ˀ

現在感覺要提升的話需要增加錄音量，並調整一些超參數重新訓練。因此可能明年年初才能有效果更好的模型。
