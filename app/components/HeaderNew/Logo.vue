<template>
    <div class="">
        <LazyNuxtImg :src="props.url" :alt="props.alt" class="w-[90px]" width="1102" height="577" />
    </div>
</template>

<script setup lang="ts">
interface LogoProps {
    url: string;
    alt: string;
}
const props = defineProps<LogoProps>()
</script>
