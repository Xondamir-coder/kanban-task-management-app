import { computed, reactive, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import {
	createModalState,
	createToggleFunction,
	getBoards,
	getTheme,
	setBoardsToLocalStorage,
} from './helpers';

// Theme
export const theme = ref(getTheme());

// Boards
export const boards = reactive(getBoards());

// Watch for boards change, set to local storage
watchEffect(() => setBoardsToLocalStorage(boards));

// current task
export const task = ref();

// current board
let currentBoard;

// Function to find the board based on route parameters
export const getCurrentBoard = () => {
	if (!currentBoard) {
		const route = useRoute();
		currentBoard = computed(() => boards.find(b => b.id === +route?.params.id));
	}
	return currentBoard;
};

// Modals
export const modals = {
	showAddBoardModal: createModalState(),
	showEditBoardModal: createModalState(),
	showDeleteBoardModal: createModalState(),
	showErrorBoardModal: createModalState(),
	showMenuModal: createModalState(),
	showViewTaskModal: createModalState(),
	showAddTaskModal: createModalState(),
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
export const toggleViewTaskModal = createToggleFunction('showViewTaskModal');
export const toggleAddTaskModal = createToggleFunction('showAddTaskModal');

export const hideMenuModal = () => (modals.showMenuModal.value = false);
export const hideEditBoardModal = () => (modals.showEditBoardModal.value = false);
export const hideAllModals = () => Object.values(modals).forEach(modal => (modal.value = false));
export const clearState = () => localStorage.clear();
