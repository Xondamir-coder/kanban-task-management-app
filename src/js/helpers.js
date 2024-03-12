import { reactive, ref } from 'vue';
import data from '../data.json';

const app = document.querySelector('#app');

export const getTheme = () => {
	const theme = localStorage.getItem('theme') || 'light';
	theme === 'dark' && document.body.classList.add('dark');
	return ref(theme);
};
export const getBoards = () => reactive(JSON.parse(localStorage.getItem('boards')) || data.boards);
export const toggleAppClosedClass = () => app.classList.toggle('app--closed');
export const getEmptyBoard = () => ({ id: 0, name: '', columns: [] });
export const getEmptyCol = () => ({ name: '', tasks: [] });
export const watchBoards = boards => localStorage.setItem('boards', JSON.stringify(boards));
export const getRandomColor = () => {
	// Generate random values for red, green, and blue components
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);

	// Construct the color string in the format "rgb(r, g, b)"
	var color = 'rgb(' + r + ', ' + g + ', ' + b + ')';

	return color;
};
