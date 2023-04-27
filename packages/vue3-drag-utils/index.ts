import DndProvider from '@/DndProvider';
import draggable from '@/Draggable';

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
