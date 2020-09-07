export default {
  path: '/card',
  component: r =>  require.ensure([], () => r(require('./card.vue')), 'card'),
};
