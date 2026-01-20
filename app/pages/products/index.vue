<template>
  <Suspense>
    <OrderPage />
    <template #fallback>
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <Loader :text="'Wczytywanie strony: Złóż zamówienie'" />
      </div>
    </template>
  </Suspense>
</template>

<script setup>
import OrderPage from "../../components/OrderPage/index.vue"
import Loader from '~/components/Loader.vue'
useHead({
  title: "Produkty | K2 Drukarnia Projektów, Hallera 11",
  meta: [
    {
      name: 'description',
      content: 'Skanujemy i drukujemy. Cały Kraj. Digitalizujemy Archiwa. Dokumentnie.'
    }
  ]
});
</script>
