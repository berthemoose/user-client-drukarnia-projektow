<template>
  <section class="py-20 lg:py-24">
    <div class="container mx-auto px-6 lg:px-8">
      <!-- Main Thesis Card -->
      <div class="relative overflow-hidden rounded-3xl shadow-2xl" style="
          background: linear-gradient(135deg, #152845 0%, #2f4d7a 50%, #152845 100%);
        ">

        <div
          class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:24px_24px] sm:bg-[size:40px_40px] pointer-events-none"
          style="mask-image: radial-gradient(circle at center, black 40%, transparent 90%);">
        </div>

        <!-- Decorative elements -->
        <div class="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-black opacity-5 rounded-full -ml-48 -mb-48"></div>

        <!-- Content -->
        <div class="relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 p-8 md:p-12 lg:p-16">
          <!-- Left side - Text Content -->
          <div class="flex flex-col justify-center">
            <!-- Badge -->
            <div
              class="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white w-fit">
              <UIcon v-if="props.data?.badge.icon" :name="props.data?.badge.icon" class="text-xl" />
              <span class="uppercase tracking-wider">{{
                props.data?.badge.text
              }}</span>
            </div>

            <!-- Main Heading -->
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {{ props.data?.texts.header }}<br />
              <span class="text-amber-300">{{ props.data?.texts.strong }}</span>
            </h2>

            <!-- Description -->
            <p class="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              {{ props.data?.texts.paragraph }}
            </p>

            <!-- Features List -->
            <div class="space-y-4 mb-8">
              <div v-for="feature in props.data.texts.specPoints" :key="feature.id"
                class="flex items-start gap-3 group">
                <div class="mt-1 flex-shrink-0">
                  <div
                    class="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <UIcon name="heroicons:check" class="text-burgundy-900 text-sm font-bold" />
                  </div>
                </div>
                <span class="text-white/95 text-base md:text-lg">{{
                  feature.specPoint
                }}</span>
              </div>
            </div>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4">
              <NuxtLink v-if="props.data.links[0]" :to="props.data.links[0].link.reference"
                class="group relative px-8 py-4 bg-amber-400 hover:bg-amber-300 text-burgundy-900 font-bold text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center">
                {{ props.data.links[0].link.label }}
                <UIcon name="heroicons:arrow-right"
                  class="ml-2 text-xl transition-transform group-hover:translate-x-1" />
              </NuxtLink>

              <NuxtLink v-if="props.data.links[1]" :to="props.data.links[1].link.reference"
                class="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold text-lg rounded-full border-2 border-white/40 transition-all duration-300 hover:border-white/60 flex items-center justify-center text-center">
                {{ props.data.links[1].link.label }}
              </NuxtLink>
            </div>
          </div>

          <!-- Right side - Visual Element -->
          <div class="flex items-center justify-center lg:justify-end">
            <div class="relative">
              <!-- Main Book/Thesis Visual -->
              <div
                class="relative w-64 h-80 md:w-72 md:h-96 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform rotate-3 hover:rotate-0 transition-all duration-500 border border-white/10"
                style="
                  background: linear-gradient(145deg, #1e3a8a 0%, #0f172a 100%);
                ">
                <!-- Book spine effect -->
                <div class="absolute left-0 top-0 bottom-0 w-8 bg-black/40 border-r border-white/5"></div>

                <!-- Gold text on cover -->
                <div class="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <div class="space-y-6">
                    <div class="text-amber-400 font-serif">
                      <div class="text-xs md:text-sm tracking-[0.3em] uppercase mb-2 opacity-80">
                        Praca
                      </div>
                      <div class="text-2xl md:text-3xl font-bold tracking-wider uppercase">
                        Dyplomowa
                      </div>
                    </div>

                    <div class="w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>

                    <div class="text-white/70 text-xs font-light tracking-wide space-y-1">
                      <div class="italic">{{ currentUniversity }}</div>
                      <div>{{ year.currentYear }}</div>
                    </div>
                  </div>
                </div>

                <!-- Corner decoration -->
                <div class="absolute top-5 right-5 w-10 h-10 border-t border-r border-amber-400/30"></div>
                <div class="absolute bottom-5 left-10 w-10 h-10 border-b border-l border-amber-400/30"></div>
              </div>

              <!-- Floating badge -->
              <div
                class="absolute -top-4 -right-4 px-4 py-3 bg-amber-400 text-burgundy-900 font-bold text-sm rounded-full shadow-lg transform rotate-12 animate-pulse">
                {{ props.data?.texts.productBadge }}
              </div>

              <!-- Background glow -->
              <div class="absolute inset-0 bg-amber-400/20 blur-3xl -z-10 scale-75"></div>
            </div>
          </div>
        </div>

        <!-- Bottom info bar -->
        <div class="relative z-10 border-t border-white/20 bg-black/20 backdrop-blur-sm">
          <div class="px-8 md:px-12 lg:px-16 py-6">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div class="flex items-center gap-2 text-white/90">
                <UIcon :name="props.data?.texts.bottomSpecs.leftBottomSpec.leftBottomSpecIcon"
                  class="text-xl text-amber-300" />
                <span class="text-sm md:text-base">{{ props.data?.texts.bottomSpecs.leftBottomSpec.leftBottomSpecText
                }}</span>
              </div>
              <div class="flex items-center gap-2 text-white/90">
                <UIcon :name="props.data?.texts.bottomSpecs.rightBottomSpec.rightBottomSpecIcon"
                  class="text-xl text-amber-300" />
                <span class="text-sm md:text-base">{{ props.data?.texts.bottomSpecs.rightBottomSpec.rightBottomSpecText
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ThesisTexts } from "~/composables/LandingPage/useLandingPage";
import { useCurrentYear } from "~/composables/useCurrentYear";
import type { Links } from "~/app/types/links";
import type { Badge } from "~/app/types/badge";

interface Thesis {
  texts: ThesisTexts;
  links: Links;
  badge: Badge;
}

interface ThesisProp {
  data: Thesis;
}

const props = defineProps<ThesisProp>();
const year = computed(() => useCurrentYear());

const pomorskieUniversities = [
  'Uniwersytet Gdański',
  'Politechnika Gdańska',
  'Uniwersytet Morski w Gdyni',
  'ASP w Gdańsku',
  'Uniwersytet Medyczny w Gdańsku',
  'WSB Merito Gdańsk'
];

const currentUniversityIndex = ref(0);
const currentUniversity = computed(() => pomorskieUniversities[currentUniversityIndex.value]);

let rotationInterval: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  rotationInterval = setInterval(() => {
    currentUniversityIndex.value = (currentUniversityIndex.value + 1) % pomorskieUniversities.length;
  }, 3000);
});

onUnmounted(() => {
  if (rotationInterval) {
    clearInterval(rotationInterval);
  }
});
</script>
