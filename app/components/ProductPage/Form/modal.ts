interface ModalStatus {
  title: string;
  message: string;
  state: "processing" | "success" | "error" | "";
}
export const handleModal = () => {
  const isModalOpen = ref(false);
  const areInputsDisabled = ref(false);
  const modalState = ref<"" | "processing" | "success" | "error">("");
  const modalTitle = ref("");
  const modalMessage = ref("");

  const openModal = (status: ModalStatus) => {
    isModalOpen.value = true;
    areInputsDisabled.value = true;
    modalState.value = status.state;
    modalTitle.value = status.title;
    modalMessage.value = status.message;
  };

  const closeModal = () => {
    isModalOpen.value = false;
    areInputsDisabled.value = false;
    modalState.value = "";
    modalTitle.value = "";
    modalMessage.value = "";
  };

  return {
    isModalOpen,
    areInputsDisabled,
    modalState,
    modalTitle,
    modalMessage,
    openModal,
    closeModal,
  };
};
