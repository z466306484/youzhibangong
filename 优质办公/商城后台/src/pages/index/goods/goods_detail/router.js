export default {
  path: '/goods_detail',
  component: r =>  require.ensure([], () => r(require('./goods_detail.vue')), 'goods_detail'),
};
