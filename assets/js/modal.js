/**
 * Creates and returns an openModal function for a configured modal element.
 *
 * @param {{ modalEl: HTMLElement, confirmBtnEl: HTMLElement|null, cancelBtnEl: HTMLElement, visibleClass: string }} config - Modal configuration.
 * @returns {function(onConfirm?: function): void} A function that opens the modal; accepts an optional confirm callback.
 */
function generateModal(config) {
  return function openModal(onConfirm) {
    config.modalEl.classList.add(config.visibleClass);

    /**
     * Closes the modal and removes event listeners.
     */
    function close() {
      config.modalEl.classList.remove(config.visibleClass);
      config.confirmBtnEl &&
        config.confirmBtnEl.removeEventListener("click", handleConfirm);
      config.cancelBtnEl.removeEventListener("click", close);
    }

    /**
     * Invokes the confirm callback and closes the modal.
     */
    function handleConfirm() {
      onConfirm && onConfirm();
      close();
    }

    config.confirmBtnEl &&
      config.confirmBtnEl.addEventListener("click", handleConfirm);
    config.cancelBtnEl.addEventListener("click", close);
  };
}

export { generateModal };
