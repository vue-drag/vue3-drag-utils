import draggable from './src/draggable';
import button from './src/button';

// Introduce on demand
export { draggable, button };

const components = [draggable, button];

const install = (App: any) => {
  components.forEach((item) => {
    App.component(item.__name, item);
  });
};
export default {
  install
};
