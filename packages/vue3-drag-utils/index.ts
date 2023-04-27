import DndProvider from '@/DndProvider/DndProvider.vue';
import draggable from '@/Draggable/Draggable.vue';

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
