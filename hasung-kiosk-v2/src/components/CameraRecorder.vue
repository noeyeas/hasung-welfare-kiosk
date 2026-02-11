<template>
  <div class="camera-container" v-if="active">
    <video ref="videoEl" autoplay playsinline muted class="camera-preview"></video>
    <div v-if="isRecording" class="recording-indicator">
      <span class="rec-dot"></span> REC
    </div>
    <div v-if="!cameraReady && !cameraError" class="camera-loading">
      카메라 연결 중...
    </div>
    <div v-if="cameraError" class="camera-error">
      {{ cameraError }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'

const props = defineProps<{
  active: boolean
}>()

const emit = defineEmits<{
  recorded: [blob: Blob]
}>()

const videoEl = ref<HTMLVideoElement | null>(null)
const stream = ref<MediaStream | null>(null)
const mediaRecorder = ref<MediaRecorder | null>(null)
const isRecording = ref(false)
const cameraReady = ref(false)
const cameraError = ref('')

async function startCamera() {
  try {
    cameraError.value = ''
    cameraReady.value = false

    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user', width: 640, height: 480 },
      audio: false
    })

    stream.value = mediaStream

    if (videoEl.value) {
      videoEl.value.srcObject = mediaStream
    }

    cameraReady.value = true
  } catch (e) {
    cameraError.value = '카메라에 접근할 수 없습니다'
    console.error('카메라 접근 실패:', e)
  }
}

function stopCamera() {
  if (stream.value) {
    stream.value.getTracks().forEach(track => track.stop())
    stream.value = null
  }
  if (videoEl.value) {
    videoEl.value.srcObject = null
  }
  cameraReady.value = false
}

async function startRecording(durationMs = 3000): Promise<Blob | null> {
  if (!stream.value || !cameraReady.value) return null

  return new Promise((resolve) => {
    const chunks: Blob[] = []

    const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
      ? 'video/webm;codecs=vp9'
      : MediaRecorder.isTypeSupported('video/webm')
        ? 'video/webm'
        : 'video/mp4'

    const recorder = new MediaRecorder(stream.value!, { mimeType })
    mediaRecorder.value = recorder

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunks.push(e.data)
      }
    }

    recorder.onstop = () => {
      isRecording.value = false
      const blob = new Blob(chunks, { type: mimeType })
      emit('recorded', blob)
      resolve(blob)
    }

    recorder.onerror = () => {
      isRecording.value = false
      resolve(null)
    }

    isRecording.value = true
    recorder.start()

    setTimeout(() => {
      if (recorder.state === 'recording') {
        recorder.stop()
      }
    }, durationMs)
  })
}

// active prop 변경 시 카메라 on/off
watch(() => props.active, async (newVal) => {
  if (newVal) {
    // nextTick 대기 후 카메라 시작 (DOM 렌더링 후)
    await new Promise(r => setTimeout(r, 100))
    await startCamera()
  } else {
    stopCamera()
  }
}, { immediate: true })

onUnmounted(() => {
  stopCamera()
})

defineExpose({
  startRecording
})
</script>

<style scoped>
.camera-container {
  position: relative;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  background: #11131c;
  border: 1px solid #2c3242;
}

.camera-preview {
  width: 100%;
  display: block;
  border-radius: 16px;
  transform: scaleX(-1);
}

.recording-indicator {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 0, 0, 0.8);
  color: #fff;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 700;
  animation: pulse 1s infinite;
}

.rec-dot {
  width: 8px;
  height: 8px;
  background: #fff;
  border-radius: 50%;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.camera-loading,
.camera-error {
  padding: 40px 20px;
  text-align: center;
  color: #b5c0d0;
  font-size: 0.95rem;
}

.camera-error {
  color: #ff8f8f;
}
</style>
