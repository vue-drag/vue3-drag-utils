import DndProvider from './src/DndProvider';
import draggable from './src/draggable';

// Introduce on demand
export { draggable };

const components = [draggable, DndProvider];

const install = (App: any) => {
  components.forEach((item) => {
    App.component(item.__name, item);
  });
};
export default {
  install
};
