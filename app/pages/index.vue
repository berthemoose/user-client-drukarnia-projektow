<template>
  <Suspense>
    <LandingPage />
    <template #fallback>
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-50">
        <Loader :text="'Wczytywanie strony głównej'" :is-full-screen="true" />
      </div>
    </template>
  </Suspense>
</template>

<script setup>
import LandingPage from '../components/LandingPage/index.vue'
import Loader from '~/components/Loader.vue'
useHead({
  title: "Kserofabryka | K2 Drukarnia Projektów, Hallera 11",
  meta: [
    {
      name: 'description',
      content: 'Skanujemy i drukujemy. Cały Kraj. Digitalizujemy Archiwa. Dokumentnie.'
    }
  ]
});
</script>
