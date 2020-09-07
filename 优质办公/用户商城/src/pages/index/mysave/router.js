export default {
  path: '/mysave',
  component: r =>  require.ensure([], () => r(require('./mysave.vue')), 'mysave'),
};
