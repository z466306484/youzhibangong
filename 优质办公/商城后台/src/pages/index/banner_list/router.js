export default {
  path: '/banner_list',
  component: r =>  require.ensure([], () => r(require('./banner_list.vue')), 'banner_list'),
};
