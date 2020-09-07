export default {
  path: '/userinfo',
  component: r =>  require.ensure([], () => r(require('./userinfo.vue')), 'userinfo'),
};
