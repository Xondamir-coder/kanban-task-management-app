import '../css/main.css';
import { createApp } from 'vue';
import App from '../App.vue';
import router from '../router';
import VueDatePicker from '@vuepic/vue-datepicker';

const app = createApp(App);
app.use(router).component('VueDatePicker', VueDatePicker).mount('#app');
