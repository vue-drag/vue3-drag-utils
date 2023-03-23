import draggable from './Draggable.vue';
draggable.install = (App: any) => {
  App.component(draggable.__name, draggable);
};
export default draggable;
