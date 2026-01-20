<template>
  <div class="cube-loader-wrapper" :style="wrapperStyle">
    <div class="cube-scene">
      <div class="cube" :style="cubeStyle">
        <div class="cube-face front" :style="getFaceStyle(images.front)"></div>
        <div class="cube-face back" :style="getFaceStyle(images.back)"></div>
        <div class="cube-face right" :style="getFaceStyle(images.right)"></div>
        <div class="cube-face left" :style="getFaceStyle(images.left)"></div>
        <div class="cube-face top" :style="getFaceStyle(images.top)"></div>
        <div class="cube-face bottom" :style="getFaceStyle(images.bottom)"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface CubeImages {
  front?: string
  back?: string
  right?: string
  left?: string
  top?: string
  bottom?: string
}

interface Props {
  size?: number
  images?: CubeImages
  speed?: number
  backgroundColor?: string
  fullscreen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 100,
  images: () => ({}),
  speed: 4,
  backgroundColor: 'transparent',
  fullscreen: false
})

const wrapperStyle = computed(() => {
  const baseStyle: Record<string, string> = {
    backgroundColor: props.backgroundColor
  }
  
  if (props.fullscreen) {
    baseStyle.position = 'fixed'
    baseStyle.inset = '0'
    baseStyle.zIndex = '9999'
  }
  
  return baseStyle
})

const cubeStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  animationDuration: `${props.speed}s`,
  '--half-size': `${props.size / 2}px`
}))

const getFaceStyle = (imageUrl?: string) => {
  if (!imageUrl) return {}
  return {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }
}
</script>

<style scoped>
.cube-loader-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  perspective: 1000px;
}

.cube-scene {
  display: flex;
  align-items: center;
  justify-content: center;
}

.cube {
  position: relative;
  transform-style: preserve-3d;
  animation: rotateCube linear infinite;
  will-change: transform;
}

.cube-face {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(59, 130, 246, 0.3);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  backface-visibility: hidden;
}

.cube-face.front {
  transform: translateZ(var(--half-size));
}

.cube-face.back {
  transform: rotateY(180deg) translateZ(var(--half-size));
}

.cube-face.right {
  transform: rotateY(90deg) translateZ(var(--half-size));
}

.cube-face.left {
  transform: rotateY(-90deg) translateZ(var(--half-size));
}

.cube-face.top {
  transform: rotateX(90deg) translateZ(var(--half-size));
}

.cube-face.bottom {
  transform: rotateX(-90deg) translateZ(var(--half-size));
}

@keyframes rotateCube {
  0% {
    transform: rotateX(0deg) rotateY(0deg);
  }
  100% {
    transform: rotateX(360deg) rotateY(360deg);
  }
}

/* Responsive - scale down on smaller screens */
@container (max-width: 768px) {
  .cube {
    transform: scale(0.8);
  }
}

@container (max-width: 480px) {
  .cube {
    transform: scale(0.6);
  }
}
</style>
