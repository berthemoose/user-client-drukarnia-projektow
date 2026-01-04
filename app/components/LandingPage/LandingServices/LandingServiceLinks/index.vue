<script setup lang="ts">
import SimpleButton from "~/components/PageElems/Buttons/SimpleButton/index.vue";
import type {Links} from "~/app/types/links";

interface LinksProp {
  links: Links;
}

const props = defineProps<LinksProp>();
</script>

<template>
  <div class="flex gap-6 items-center">
    <SimpleButton v-for="link in props.links" :key="link.id" :data="link.link" />
  </div>
</template>
