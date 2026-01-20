<template>
  <div v-if="pending">
    <Loader :text="'Ładowanie regulaminu'" :is-full-screen="true" />
  </div>
  <div v-else class="mt-12 md:mt-24">
    <UContainer>
      <div
      class="h-[100px] my-6 p-4 md:my-12 w-full flex items-center justify-center md:justify-start"
      >
      <h1 class="text-black font-bold text-4xl md:text-5xl underline">
        Regulamin
      </h1>
    </div>
    <div v-if="regulaminComputedContent" v-html="regulaminComputedContent" class="render-text-html"></div>
      <div class="px-2 sm:px-6"></div>
    </UContainer>
  </div>
</template>

<script setup>
import { useRegulamin } from "~/composables/Regulamin/useRegulamin";
import { useRichText } from "~/composables/useRichText";
const { data, pending, error, refresh } = useRegulamin();
const { sanitize, isReady } = useRichText();

const regulamin = computed(() => data.value?.contentHTML);
const regulaminContent = ref("");
const regulaminComputedContent = computed(()=> regulaminContent.value || "")
const updateSanitizedContent = () => {
  if (regulamin.value) regulaminContent.value = sanitize(regulamin.value);
};

const stopWatch = watch(
  [isReady, regulamin],
  () => {
    if (isReady.value) {
      updateSanitizedContent();
    }
  },
  { immediate: true }
);

onUnmounted(() => {
  stopWatch();
});

useHead({
  title: "Regulamin | K2 Drukarnia Projektów, Hallera 11",
  meta: [
    {
      name: "description",
      content:
        "Skanujemy i drukujemy. Cały Kraj. Digitalizujemy Archiwa. Dokumentnie.",
    },
  ],
});
</script>

<style scoped>
.render-text-html:deep(ol) {
  padding-block: 0.25rem;
  margin-block: 1rem;
  padding-inline: 1rem;
  list-style: decimal;
}

/* "Nad-tytuły" */
.render-text-html:deep(.label) {
  text-transform: uppercase;
  font-size: 0.75rem;
  line-height: 1rem;
}

/* Tytuły, największe */
.render-text-html:deep(h1) {
  /* TEXT-5XL */
  font-size: 3rem;
  /* 48px */
  line-height: 1;
  padding-block: 0.5rem;
}

/* Tytuły podstron */
.render-text-html:deep(h2) {
  /* TEXT-3XL */
  font-size: 1.875rem;
  /* 30px */
  line-height: 2.25rem;
  /* 36px */
}

/* Tytuły sekcji */
.render-text-html:deep(h3) {
  /* TEXT-2XL */
  font-size: 1.5rem;
  /* 24px */
  line-height: 2rem;
  /* 32px */
}

/* Wyróżniony tekst */
.render-text-html:deep(h4) {
  /* TEXT-XL */
  font-size: 1.25rem;
  /* 20px */
  line-height: 1.75rem;
  /* 28px */
}
</style>
