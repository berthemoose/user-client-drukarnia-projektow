<script setup lang="ts">
// Control reCAPTCHA badge visibility based on current route
useRecaptchaBadge();
</script>

<template>
  <div>
    <UApp>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UApp>
  </div>
</template>
