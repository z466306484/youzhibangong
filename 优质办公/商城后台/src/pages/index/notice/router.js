export default {
  path: '/notice',
  component: r =>  require.ensure([], () => r(require('./notice.vue')), 'notice'),
};
