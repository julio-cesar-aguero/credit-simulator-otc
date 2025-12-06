import { defineConfig } from 'vite'

export default defineConfig({
  // 👇 Debe coincidir con el nombre de tu repo en GitHub entre barras /
  base: '/credit-simulator-otc/', 
  build: {
    outDir: 'dist'
  }
})