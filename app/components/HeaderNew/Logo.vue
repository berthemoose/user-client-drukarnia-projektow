<template>
    <div class="">
        <NuxtLink to="/">
            <LazyNuxtImg :src="props.url" :alt="props.alt" class="w-[90px]" width="1102" height="577" />
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
interface LogoProps {
    url: string;
    alt: string;
}
const props = defineProps<LogoProps>()
</script>
