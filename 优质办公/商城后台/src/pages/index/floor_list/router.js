export default {
  path: '/floor_list',
  component: r =>  require.ensure([], () => r(require('./floor_list.vue')), 'floor_list'),
};
