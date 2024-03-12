import { createRouter, createWebHistory } from 'vue-router';
import { getCurrentBoard, toggleModal } from '../js/state';
import HomeView from '../views/HomeView.vue';
import BoardView from '../views/BoardView.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/board/:id',
			name: 'board',
			component: BoardView,
		},
	],
});

router.afterEach(to => {
	const currentBoard = getCurrentBoard();
	if (to.name === 'board' && !currentBoard.value) {
		toggleModal('board-error');
		router.push('/');
	}
});

export default router;
