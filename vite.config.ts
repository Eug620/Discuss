import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'
import tailwindcss from '@tailwindcss/vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import { execSync } from 'child_process'
// 辅助函数：安全地执行 shell 命令
const getGitInfo = (command: string) => {
  try {
    return execSync(command, { encoding: 'utf-8' }).trim()
  } catch {
    return 'unknown'
  }
}

const commitHash = getGitInfo('git rev-parse --short HEAD')
const commitAuthor = getGitInfo('git log -1 --pretty=format:"%an"')
const commitTime = getGitInfo('git log -1 --pretty=format:"%ci"')

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: `${env.VITE_APP_BUILD_INFO === 'production' ? 'https://eug620.github.io/discuss/' : '/'}`,
    plugins: [
      vue(),
      tailwindcss(),
      // HTML 压缩配置
      createHtmlPlugin({
        minify: {
          removeComments: true,          // 移除注释
          collapseWhitespace: true,      // 移除空格和换行
          collapseBooleanAttributes: true, // 简写布尔属性
          removeScriptTypeAttributes: true, // 移除 script 的 type="text/javascript"
          removeStyleLinkTypeAttributes: true, // 移除 style/link 的 type
          removeRedundantAttributes: true, // 移除冗余属性
          useShortDoctype: true,         // 使用 <!doctype html>
          removeEmptyAttributes: true,   // 移除空属性
          keepClosingSlash: true,        // 保持自闭合标签的斜杠
          minifyJS: true,                // 压缩内联 JS
          minifyCSS: true,               // 压缩内联 CSS
          minifyURLs: true,              // 压缩 URL
        }
      })
    ],
    server: {
      host: true,
      port: 8000,
      open: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      proxy: {
        '/api': {
          target: env.VITE_APP_API_BASE_URL,
          changeOrigin: true,
          // rewrite: path => path.replace(/^\/api/, '')
        },
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        // '@': path.resolve(__dirname, 'src'),
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    build: {
      sourcemap: false, // 关闭 source map
      minify: 'terser', // 使用 terser 进行代码压缩
      terserOptions: {
        compress: {
          drop_console: true, // 生产环境移除 console
          drop_debugger: true, // 移除 debugger
          pure_funcs: ['console.log', 'console.info', 'console.debug'], // 移除特定函数
        },
        format: {
          comments: false, // 移除注释
        },
      },
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]'
        }
      }
    },
    define: {
      __COMMIT_HASH__: JSON.stringify(commitHash),
      __COMMIT_AUTHOR__: JSON.stringify(commitAuthor),
      __COMMIT_TIME__: JSON.stringify(commitTime),
    }
  }
})
