export default {
  path: '/tuihuo',
  component: r =>  require.ensure([], () => r(require('./tuihuo.vue')), 'tuihuo'),
};
