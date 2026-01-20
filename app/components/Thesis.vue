<template>
    <div>
        <div class="relative">
            <!-- Main Book/Thesis Visual -->
            <div class="relative w-64 h-80 md:w-72 md:h-96 bg-gradient-to-br rounded-lg shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
                style="
              background: linear-gradient(145deg, #7b2f4a 0%, #5b1f3a 100%);
            ">
                <!-- Book spine effect -->
                <div class="absolute left-0 top-0 bottom-0 w-8 bg-black/20"></div>

                <!-- Gold text on cover -->
                <div class="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                    <div class="space-y-6">
                        <div class="text-amber-300 font-serif">
                            <div class="text-xs md:text-sm tracking-widest uppercase mb-2">
                                Praca
                            </div>
                            <div class="text-2xl md:text-3xl font-bold tracking-wider uppercase">
                                Dyplomowa
                            </div>
                        </div>

                        <div class="w-16 h-0.5 bg-amber-300 mx-auto"></div>

                        <div class="text-white/60 text-xs md:text-sm space-y-1">
                            <div>{{ currentUniversity }}</div>
                            <div>{{ currentYear }}</div>
                        </div>
                    </div>
                </div>

                <!-- Corner decoration -->
                <div class="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-amber-300/50"></div>
                <div class="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-amber-300/50"></div>
            </div>

            <!-- Floating badge -->
            <div
                class="absolute -top-4 -right-4 px-4 py-3 bg-amber-400 text-burgundy-900 font-bold text-sm rounded-full shadow-lg transform rotate-12 animate-pulse text-black">
                Najlepszy wybór dla Studenta!
            </div>

            <!-- Background glow -->
            <div class="absolute inset-0 bg-amber-400/20 blur-3xl -z-10 scale-75"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
const pomorskieUniversities = [
    "Uniwersytet Gdański",
    "Politechnika Gdańska",
    "Uniwersytet Morski w Gdyni",
    "ASP w Gdańsku",
    "Uniwersytet Medyczny w Gdańsku",
    "WSB Merito Gdańsk",
];

const { currentYear } = useCurrentYear();
const currentUniversityIndex = ref(0);
const currentUniversity = computed(
    () => pomorskieUniversities[currentUniversityIndex.value]
);
let rotationInterval: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
    rotationInterval = setInterval(() => {
        currentUniversityIndex.value =
            (currentUniversityIndex.value + 1) % pomorskieUniversities.length;
    }, 3000);
});

onUnmounted(() => {
    if (rotationInterval) {
        clearInterval(rotationInterval);
    }
});
</script>
