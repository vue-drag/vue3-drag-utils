import draggable from './src/draggable';
import button from './src/button';
import button1 from './src/button/HButton.vue';

// Introduce on demand
export { draggable, button };

// const components = [draggable, button];

// const install = (App: any) => {
//   components.forEach((item) => {
//     App.use(item);
//   });
// };
const install = (App: any) => {
  console.log('button1', App, button1, button1.__name);
  App.component('HButton', button1);
};

export default {
  install
};
