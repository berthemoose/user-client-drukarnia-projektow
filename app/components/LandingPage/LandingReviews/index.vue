<template>
  <section class="py-16 sm:py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header -->
      <div class="text-center mb-12">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {{ data.header }}
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          {{ data.paragraph }} <span class="text-blue-600">{{ data.strong }}</span>
        </p>
      </div>

      <!-- Review Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ReviewCard 
          v-for="(review, index) in reviews" 
          :key="index"
          :review="review"
          class="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        />
      </div>

      <!-- CTA Button -->
      <div class="text-center mt-16">
        <UButton
          to="/reviews"
          color="black"
          size="xl"
          class="group relative overflow-hidden px-8 py-4 text-lg font-medium rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          Zobacz wszystkie opinie
          <UIcon name="mdi:arrow-right" class="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
        </UButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import ReviewCard from './ReviewCard/index.vue';

const props = defineProps<{
  data: {
    header: string;
    paragraph: string;
    strong: string;
  }
}>();

// Generate random ratings between 4.5 and 5.0
const ratings = ref<number[]>([]);

// Generate initial ratings
for (let i = 0; i < 10; i++) {
  ratings.value.push(4.5 + Math.random() * 0.5);
}

// Sample reviews data
const reviews = [
  {
    id: 1,
    name: 'Anna Kowalska',
    rating: 5,
    date: '2 tygodnie temu',
    content: 'Świetna jakość wydruków i szybka realizacja zamówienia. Polecam!',
    source: 'Google'
  },
  {
    id: 2,
    name: 'Jan Nowak',
    rating: 5,
    date: '3 tygodnie temu',
    content: 'Profesjonalna obsługa i doskonała jakość. Na pewno wrócę!',
    source: 'Facebook'
  },
  {
    id: 3,
    name: 'Marta Wiśniewska',
    rating: 5,
    date: 'miesiąc temu',
    content: 'Szybko, sprawnie i dokładnie tak jak chciałam. Polecam z czystym sumieniem!',
    source: 'Google'
  }
];

// Marquee animation
const marqueeRef = ref<HTMLElement | null>(null);
let animationFrameId: number;
let position = 0;
const speed = 0.5; // pixels per frame

const animate = () => {
  if (marqueeRef.value) {
    position -= speed;
    if (position <= -marqueeRef.value.scrollWidth / 2) {
      position = 0;
    }
    marqueeRef.value.style.transform = `translateX(${position}px)`;
  }
  animationFrameId = requestAnimationFrame(animate);
};

onMounted(() => {
  if (marqueeRef.value) {
    // Duplicate items for seamless looping
    const track = marqueeRef.value;
    track.innerHTML += track.innerHTML;
    // Start animation
    animationFrameId = requestAnimationFrame(animate);
  }
});

onBeforeUnmount(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});
</script>
