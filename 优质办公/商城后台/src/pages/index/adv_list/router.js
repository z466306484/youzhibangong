export default {
  path: '/adv_list',
  component: r =>  require.ensure([], () => r(require('./adv_list.vue')), 'adv_list'),
};
