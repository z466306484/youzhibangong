export default {
  path: '/myadress',
  component: r =>  require.ensure([], () => r(require('./myadress.vue')), 'myadress'),
};
