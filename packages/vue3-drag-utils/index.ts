import DndProvider from './src/DndProvider';
import draggable from './src/Draggable';

// Introduce on demand
export { draggable, DndProvider };

const components = [draggable, DndProvider];

const install = (App: any) => {
  components.forEach((item) => {
    App.component(item.__name, item);
  });
};
export default {
  install
};
