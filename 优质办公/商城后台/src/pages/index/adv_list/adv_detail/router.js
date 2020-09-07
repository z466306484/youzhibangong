export default {
  path: '/adv_detail',
  component: r =>  require.ensure([], () => r(require('./adv_detail.vue')), 'adv_detail'),
};
