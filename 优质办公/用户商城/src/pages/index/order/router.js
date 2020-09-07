export default {
  path: '/order',
  component: r =>  require.ensure([], () => r(require('./order.vue')), 'order'),
};
