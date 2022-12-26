import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'
import type { UserConfig, ConfigEnv } from 'vite';
import legacy from '@vitejs/plugin-legacy'
import vue2 from '@vitejs/plugin-vue2'
import vue2Jsx from '@vitejs/plugin-vue2-jsx'
import unpluginVueComponents from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

const iconPath = path.resolve(process.cwd(), 'src/assets/icons')
console.log('iconPath')
console.log(iconPath)

// https://vitejs.dev/config/
export default({ command }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build';
  return {
    plugins: [
      vue2(),
      vue2Jsx(),
      legacy({
        targets: ['ie >= 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime']
      }),
      unpluginVueComponents(), // default config: dirs: ['src/components']
      AutoImport({
        eslintrc: {
          enabled: true, // <-- this
        },
        dts: true,
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/, /\.vue\?vue/, // .vue
        ],
        imports: [
          'vue',
          'vue-router'
        ]
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        svgoOptions: isBuild,
        // default
        symbolId: 'icon-[dir]-[name]',
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {
            'primary-color': '#115dfc',
            'link-color': '#1DA57A',
            'border-radius-base': '2px',
          },
        }
      }
    }
  }
}
