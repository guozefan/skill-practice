import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path';
import vueJsx from "@vitejs/plugin-vue-jsx";

import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import resolveExternalsPlugin from 'vite-plugin-resolve-externals'




// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    hmr: true,
    host: '0.0.0.0',
    open: true,
    proxy:{
      "/api":{
        target:'http://localhost:3000',
        changeOrigin:true,
        rewrite(path){
          return path.replace(/^\/api/,'')
        }
      }
    }
  },
  resolve: {
		extensions: [".js", ".vue", ".json", "scss", ".ts"],
		alias: [
			{
				find: "@",
				replacement: resolve(__dirname, "src"),
			},
			{
				find: "components",
				replacement: resolve(__dirname, "src/components"),
			},
			{
				find: "utils",
				replacement: resolve(__dirname, "src/utils"),
			},
			{
				find: "vites",
				replacement: resolve(__dirname, "src/view"),
			},
		],
	},
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          enabledCollections: ['ep']
        })
      ]
    }),
    Icons({ autoInstall: true }),
    // resolveExternalsPlugin({
    //   Amap: Amp
    // })
  ],
  build: {
    target: 'es2020',
    sourcemap: true,
    outDir: "dist",
			minify: "esbuild",
			// esbuild 打包更快，但是不能去除 console.log，terser打包慢，但能去除 console.log
			// minify: "terser",
      	// terserOptions: {
			// 	compress: {
			// 		drop_console: viteEnv.VITE_DROP_CONSOLE,
			// 		drop_debugger: true
			// 	}
			// },
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
      }
    }
  },
})
