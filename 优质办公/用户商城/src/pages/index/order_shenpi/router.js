export default {
  path: '/order_shenpi',
  component: r =>  require.ensure([], () => r(require('./order_shenpi.vue')), 'order_shenpi'),
};
