export default {
  path: '/caigousm',
  component: r =>  require.ensure([], () => r(require('./caigousm.vue')), 'caigousm'),
};
