export default {
  path: '/sqtuihuo',
  component: r =>  require.ensure([], () => r(require('./sqtuihuo.vue')), 'sqtuihuo'),
};
