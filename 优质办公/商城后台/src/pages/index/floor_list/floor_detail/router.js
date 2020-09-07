export default {
  path: '/floor_detail',
  component: r =>  require.ensure([], () => r(require('./floor_detail.vue')), 'floor_detail'),
};
