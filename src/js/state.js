import { computed, reactive, ref } from 'vue';
import { createModalState, createToggleFunction, getTheme } from './helpers';
import data from '../data.json';

// Theme
export const theme = ref(getTheme());

// Boards
export const boards = reactive(data.boards);

// Modals
export const modals = {
	showAddBoardModal: createModalState(),
	showEditBoardModal: createModalState(),
	showDeleteBoardModal: createModalState(),
	showErrorBoardModal: createModalState(),
	showMenuModal: createModalState(),
};

// Any modal active
export const anyModalActive = computed(() => Object.values(modals).some(modal => modal.value));

// Toggle functions
export const toggleTheme = () => {
	theme.value = theme.value === 'light' ? 'dark' : 'light';
	localStorage.setItem('theme', theme.value);
	document.body.classList.toggle('dark');
};

export const toggleAddBoardModal = createToggleFunction('showAddBoardModal');
export const toggleEditBoardModal = createToggleFunction('showEditBoardModal');
export const toggleDeleteBoardModal = createToggleFunction('showDeleteBoardModal');
export const toggleErrorBoardModal = createToggleFunction('showErrorBoardModal');
export const toggleMenuModal = createToggleFunction('showMenuModal');

export const hideMenuModal = () => (modals.showMenuModal.value = false);
export const hideEditBoardModal = () => (modals.showEditBoardModal.value = false);
export const hideAllModals = () => Object.values(modals).forEach(modal => (modal.value = false));
