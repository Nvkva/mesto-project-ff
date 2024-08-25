export function openDialog(dialog) {
  dialog.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeDialogByEsc);
}

export function closeDialog(dialog) {
  dialog.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeDialogByEsc);
}

export function closeDialogByOverlay(event, dialog) {
  if (event.target === dialog) {
    closeDialog(dialog);
  }
}

export function closeDialogByEsc(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeDialog(openedPopup);
  }
}
