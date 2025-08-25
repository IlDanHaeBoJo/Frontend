class AudioProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    
    this.buffer = [];
    this.bufferSize = 1600;
    
    this.isTTSPlaying = false;
    
    this.port.onmessage = (event) => {
      if (event.data.command === "stop") {
        this.buffer = [];
      } else if (event.data.command === "setTTSState") {
        this.isTTSPlaying = event.data.isPlaying;
        console.log(`AudioProcessor: TTS 상태 변경 - ${this.isTTSPlaying ? '재생중' : '중단'}`);
      }
    };
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0];
    if (input.length > 0) {
      const pcmData = input[0];
      
      const int16Array = new Array(pcmData.length);
      for (let i = 0; i < pcmData.length; i++) {
        int16Array[i] = Math.max(-32767, Math.min(32767, pcmData[i] * 32767));
      }
      
      // RMS 계산
      let sum = 0;
      for (let i = 0; i < int16Array.length; i++) {
        const floatVal = int16Array[i];
        sum += floatVal * floatVal;
      }
      const rms = Math.sqrt(sum / int16Array.length);
      
      if (this.isTTSPlaying) {
        if (rms < 1000) {
          return true;
        }
        console.log(`🗣️ 호응어 감지 (TTS 재생 중) - RMS: ${rms.toFixed(0)}`);
      }
      
      // 버퍼에 int16 데이터 추가
      for (let i = 0; i < int16Array.length; i++) {
        this.buffer.push(int16Array[i]);
      }
      
      if (this.buffer.length >= this.bufferSize) {
        const int16Data = new Int16Array(this.buffer.splice(0, this.bufferSize));
        this.port.postMessage(int16Data.buffer, [int16Data.buffer]);
      }
    }
    return true;
  }
}

registerProcessor("audio-processor", AudioProcessor);
