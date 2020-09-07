export default {
  path: '/banner_detail',
  component: r =>  require.ensure([], () => r(require('./banner_detail.vue')), 'banner_detail'),
};
