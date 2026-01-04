<template>
  <nav aria-label="Breadcrumb">
    <ol class="flex items-center text-sm text-gray-500">
      <li v-for="page in staticPagesList" :key="page.to" class="flex items-center">
        <NuxtLink :to="page.to" class="font-medium hover:text-gray-900 transition-colors">
          {{ page.name }}
        </NuxtLink>
        <span class="mx-2 text-gray-400">/</span>
      </li>

      <li class="font-semibold text-gray-900">
        {{ productName }}
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
interface BreadcrumbProps {
  productName: string;
}
const props = defineProps<BreadcrumbProps>();
const staticPagesList = computed(() => ([
  {
    name: "Strona główna",
    to: '/'
  },
  {
    name: "Produkty",
    to: '/products'
  }
]));
</script>
