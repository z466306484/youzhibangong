export default {
  path: '/order_detail',
  component: r =>  require.ensure([], () => r(require('./order_detail.vue')), 'order_detail'),
};
