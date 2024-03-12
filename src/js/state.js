import { computed, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { getBoards, getTheme, watchBoards } from './helpers';

// Theme
export const theme = getTheme();

// Boards
export const boards = getBoards();

// Watch for boards change, set to local storage
watchEffect(() => watchBoards(boards));

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
export const showModal = ref(''); // type of modal
export const toggleModal = modalName => {
	modalName = typeof modalName !== 'string' ? '' : modalName; // vue passes event by default
	showModal.value = modalName;
};

// Toggle functions
export const toggleTheme = () => {
	theme.value = theme.value === 'light' ? 'dark' : 'light';
	localStorage.setItem('theme', theme.value);
	document.body.classList.toggle('dark');
};

export const clearState = () => localStorage.clear();
