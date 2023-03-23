import button from './HButton.vue';
button.install = (App: any) => {
  App.component(button.__name, button);
};
export default button;
