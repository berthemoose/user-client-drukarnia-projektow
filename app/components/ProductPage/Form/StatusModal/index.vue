<template>
  <UModal v-model:open="isOpen">
    <div>
      <div class="p-4">
        <!-- processing order state -->
        <div class="" v-if="state === 'processing'">
          <div class="flex items-center text-center justify-center">
            <p class="text-3xl my-4">
              {{ title }}
            </p>
          </div>

          <Loader :show-text="false" :size="75" />
          <div class="flex items-center text-center justify-center">
            <p class="text-sm my-4 w-2/3">{{ msg }}{{ dots }}</p>
          </div>
        </div>

        <!-- error state -->
        <div class="" v-if="state === 'error'">
          <div class="flex items-center text-center justify-center">
            <p class="text-3xl my-4">
              {{ title }}
            </p>
          </div>

          <div class="flex items-center text-center justify-center">
            <p class="text-sm my-4 w-2/3">{{ msg }}</p>
          </div>
          <div class="p-4 flex items-center text-center justify-center">
            <UButton
              label="Kontynuuj"
              color="black"
              @click="triggerCloseModal()"
            />
          </div>
        </div>
        <!-- success state -->
        <div class="" v-if="state === 'success'">
          <div class="flex items-center text-center justify-center">
            <p class="text-3xl my-4">
              {{ title }}
            </p>
          </div>

          <div class="flex items-center text-center justify-center">
            <p class="text-sm my-4 w-2/3">{{ msg }}</p>
          </div>
          <div class="p-4 flex items-center text-center justify-center">
            <UButton
              label="Kontynuuj"
              color="black"
              @click="triggerCloseModal()"
            />
          </div>
        </div>
      </div>
    </div>
  </UModal>
</template>

<script lang="ts" setup>
interface ModalProp {
  isModalOpen: boolean;
  modalTitle: string;
  modalMsg: string;
  modalState: "processing" | "success" | "error" | "";
}
import { getDots } from "./dots";
const props = defineProps<ModalProp>();

const {
  isModalOpen: isOpen,
  modalState: state,
  modalTitle: title,
  modalMsg: msg,
} = toRefs(props);
const { dots } = getDots(true);

const emit = defineEmits<{
  (e: "trigger-close-modal"): void;
}>();

const triggerCloseModal = () => {
  emit("trigger-close-modal");
};
</script>
