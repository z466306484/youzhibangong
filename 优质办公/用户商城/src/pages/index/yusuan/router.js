export default {
  path: '/yusuan',
  component: r =>  require.ensure([], () => r(require('./yusuan.vue')), 'yusuan'),
};
