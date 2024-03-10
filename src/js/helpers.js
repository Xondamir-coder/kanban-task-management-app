import { ref } from 'vue';
import { modals } from './state';

const app = document.querySelector('#app');

export const getTheme = () => {
	const theme = localStorage.getItem('theme') || 'light';
	theme === 'dark' && document.body.classList.add('dark');
	return theme;
};
export const toggleAppClosedClass = () => app.classList.toggle('app--closed');
export const getEmptyBoard = () => ({ id: 0, name: '', columns: [] });
export const getEmptyCol = () => ({ name: '', tasks: [] });
export const createModalState = () => ref(false);
export const createToggleFunction = modal => () => (modals[modal].value = !modals[modal].value);
export const getRandomColor = () => {
	// Generate random values for red, green, and blue components
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);

	// Construct the color string in the format "rgb(r, g, b)"
	var color = 'rgb(' + r + ', ' + g + ', ' + b + ')';

	return color;
};
