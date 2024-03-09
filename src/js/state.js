import { computed, reactive, ref } from 'vue';
import { getTheme } from './helpers';
import data from '../data.json';

export const theme = ref(getTheme());
export const boards = reactive(data.boards);

// Variables to control the visibility of modals
export const showAddBoardModal = ref(false);
export const showEditBoardModal = ref(false);
export const showDeleteBoardModal = ref(false);
export const showErrorBoardModal = ref(false);
export const showMenuModal = ref(false);
export const anyModalActive = computed(
	() =>
		showAddBoardModal.value ||
		showEditBoardModal.value ||
		showErrorBoardModal.value ||
		showDeleteBoardModal.value ||
		showMenuModal.value
);

// Functions to toggle modals
export const toggleTheme = () => {
	theme.value = theme.value === 'light' ? 'dark' : 'light';
	localStorage.setItem('theme', theme.value);
	document.body.classList.toggle('dark');
};
export const toggleAddBoardModal = () => (showAddBoardModal.value = !showAddBoardModal.value);
export const toggleEditBoardModal = () => (showEditBoardModal.value = !showEditBoardModal.value);
export const toggleDeleteBoardModal = () =>
	(showDeleteBoardModal.value = !showDeleteBoardModal.value);
export const toggleErrorBoardModal = () => (showErrorBoardModal.value = !showErrorBoardModal.value);
export const toggleMenuModal = () => (showMenuModal.value = !showMenuModal.value);
export const hideMenuModal = () => (showMenuModal.value = false);
export const hideEditBoardModal = () => (showEditBoardModal.value = false);
export const hideAllModals = () =>
	(showAddBoardModal.value =
		showEditBoardModal.value =
		showDeleteBoardModal.value =
		showErrorBoardModal.value =
		showMenuModal.value =
		showDeleteBoardModal.value =
			false);
