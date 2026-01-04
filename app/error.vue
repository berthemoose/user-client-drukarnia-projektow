<template>
    <UContainer class="flex flex-row items-center justify-center h-screen ">
        <UCard>
            <div class="p-12 flex flex-col items-center text-center gap-2">
                <h1 class="text-5xl md:text-7xl font-arialblack">{{ error.statusCode }}</h1>
                <p class="text-3xl md:text-6xl">Przepraszamy, wystąpił błąd</p>
                <p class="text-xs">{{ error.message }}</p>
            </div>
        </UCard>
    </UContainer>
</template>

<script setup>
defineProps(['error']);
</script>

