export default {
  path: '/pwd',
  component: r =>  require.ensure([], () => r(require('./pwd.vue')), 'pwd'),
};
