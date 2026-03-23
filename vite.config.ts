import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/spring-parameter-tuner/',
  resolve: {
    tsconfigPaths: true,
  },
});
