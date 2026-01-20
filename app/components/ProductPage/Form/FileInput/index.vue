<template>
  <div class="my-4">
    <UFileUpload v-model="fileModel" accept="application/pdf,image/jpeg,image/png,image/webp" icon="i-lucide-image"
      :disabled="areInputsDisabledRef" variant="area" layout="list" size="xl" label="Wybierz plik"
      description="PDF, JPG, SVG (max 100MB)" :ui="{
        base: 'transition-all duration-200 ease-in-out',
        rounded: 'rounded-xl',
        ring: 'ring-2 ring-transparent focus:ring-primary-500 dark:focus:ring-primary-400',
        border: 'border-2 border-gray-200 dark:border-gray-700 hover:border-primary-400 dark:hover:border-primary-500',
        shadow: 'shadow-sm hover:shadow-md focus:shadow-lg',
      }" class="">

      <template #actions="{ open }">
        <div class="flex flex-col items-center justify-center">
          <div>
            <UButton label="Wybierz plik" icon="i-lucide-upload" color="neutral" variant="outline" @click="open()" />
          </div>
          <p class="text-xs">Kliknij lub upuść plik</p>
        </div>
      </template>

      <template #files-bottom="{ removeFile, files }">

      </template>
    </UFileUpload>
  </div>
</template>

<script lang="ts" setup>
interface FileInputProps {
  file: File | null;
  areInputsDisabled: boolean;
}

interface FileInputEmits {
  (e: 'update:file', value: File | null): void;
}

const props = defineProps<FileInputProps>();
const emit = defineEmits<FileInputEmits>();
const { areInputsDisabled: areInputsDisabledRef } = toRefs(props);

const fileModel = computed({
  get: () => props.file,
  set: (value: File | File[] | null | undefined) => {
    let file: File | null = null;

    if (value) {
      if (Array.isArray(value)) {
        // Handle array - only take first file if array is not empty
        file = value.length > 0 ? (value[0] ?? null) : null;
      } else {
        // Handle single file
        file = value;
      }
    }

    emit('update:file', file);
  }
});
</script>
