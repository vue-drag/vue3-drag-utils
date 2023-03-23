import DndProvider from './DndProvider.vue';
DndProvider.install = (App: any) => {
  App.component(DndProvider.__name, DndProvider);
};
export default DndProvider;
