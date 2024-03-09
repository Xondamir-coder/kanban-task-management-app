const app = document.querySelector('#app');

export const getTheme = () => {
	const theme = localStorage.getItem('theme') || 'light';
	theme === 'dark' && document.body.classList.add('dark');
	return theme;
};
export const toggleAppClosedClass = () => app.classList.toggle('app--closed');
export const getEmptyBoard = () => ({ id: 0, name: '', columns: [] });
export const getEmptyCol = () => ({ name: '', tasks: [] });
