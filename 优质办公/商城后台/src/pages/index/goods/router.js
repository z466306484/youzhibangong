export default {
  path: '/goods_list',
  component: r =>  require.ensure([], () => r(require('./goods_list.vue')), 'goods_list'),
};
