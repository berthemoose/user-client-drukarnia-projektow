<template>
  <div>
    <!-- Disabled button -->
    <div v-if="!isActive" class="w-full flex justify-center py-2 my-2">
      <UPopover mode="hover">
        <UButton
          :loading="isLoading"
          size="xl"
          disabled
          :class="[
            '!bg-slate-800 group relative overflow-hidden px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-medium rounded-full',
          ]"
        >
          <span>{{ label }}</span>
          <UIcon
            name="material-symbols:arrow-right-alt-rounded"
            :class="['text-lg sm:text-xl']"
        /></UButton>
        <template #panel>
          <div class="p-4 text-black">
            Aby złożyć zamówienie uzupełnij wymagane informacje
          </div>
        </template>
      </UPopover>
    </div>
    <!-- Working button -->
    <div class="w-full flex justify-center py-2 my-2" v-else>
      <UButton
        :loading="isLoading"
        color="black"
        size="xl"
        @click="triggerSubmit()"
        :class="[
          'group relative overflow-hidden px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-medium rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center',
        ]"
      >
        <span>{{ label }}</span>
        <UIcon
          name="material-symbols:arrow-right-alt-rounded"
          :class="[
            'text-lg sm:text-xl transition-transform duration-500 group-hover:translate-x-1',
          ]"
        />
      </UButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface SubmitButtonProp {
  isButtonLoading: boolean;
  isButtonActive: boolean;
  buttonLabel?: string;
}
const props = defineProps<SubmitButtonProp>();

/* Button properties */
const label = computed(() => props?.buttonLabel);
const { isButtonLoading: isLoading, isButtonActive: isActive } = toRefs(props);

/* Emit button "submit" event  */
const emit = defineEmits<{
  (e: "trigger-submit"): void;
}>();

const triggerSubmit = () => {
  emit("trigger-submit");
};
</script>

<style></style>
