import { hmrPlugin } from '@open-wc/dev-server-hmr';

const hmr = process.argv.includes('--hmr');

export default ({
  open: '/',
  watch: !hmr,
  nodeResolve: {
    exportConditions: ['browser', 'development'],
  },

  plugins: [
    hmrPlugin({
      include: ['src/**/*'],
    }),
  ],
});
