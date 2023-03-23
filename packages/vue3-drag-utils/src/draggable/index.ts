import draggable from './draggable.vue';
draggable.install = (App: any) => {
  App.component(draggable.__name, draggable);
};
export default draggable;
