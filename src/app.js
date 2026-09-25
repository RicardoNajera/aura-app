import TotemView from './views/TotemView.js';
import RadioView from './views/RadioView.js';

const routes = {
  '': TotemView,
  '#/totem': TotemView,
  '#/radio': RadioView
};

const router = async () => {
  const app = document.getElementById('app');
  const path = window.location.hash || '';
  const View = routes[path] || TotemView;

  if (window.currentViewCleanup) {
    window.currentViewCleanup();
    window.currentViewCleanup = null;
  }

  app.innerHTML = View.html();#

  if (View.init) {
    window.currentViewCleanup = await View.init();
  }
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
