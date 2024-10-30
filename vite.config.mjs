// https://github.com/vitejs/vite/discussions/3448
// import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';

// ----------------------------------------------------------------------

export default defineConfig({
    plugins: [
        react(),
        jsconfigPaths(),
        VitePWA({
            registerType: 'autoUpdate',
            devOptions: {
                enabled: true
            },
            includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
            manifest: {
                name: 'Study-Project', // 설치 배너에 표시되는 이름
                short_name: 'SP', // 아이콘 아래에 표시될 이름
                start_url: '/',
                background_color: '#ffffff',
                theme_color: '#ffffff',
                description: 'Quve Study Project',
                icons: [
                    {
                        src: 'pwa-64x64.png',
                        sizes: '64x64',
                        type: 'image/png'
                    },
                    {
                        src: 'logo192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'logo512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any'
                    },
                    {
                        src: 'maskable-icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'maskable'
                    }
                ]
            }
        })
    ],
    // https://github.com/jpuri/react-draft-wysiwyg/issues/1317
    base: '/',
    define: {
        global: 'window'
    },
    resolve: {
        // alias: [
        //   {
        //     find: /^~(.+)/,
        //     replacement: path.join(process.cwd(), 'node_modules/$1')
        //   },
        //   {
        //     find: /^src(.+)/,
        //     replacement: path.join(process.cwd(), 'src/$1')
        //   }
        // ]
    },
    server: {
        // this ensures that the browser opens upon server start
        open: true,
        // this sets a default port to 3000
        port: 3007
    },
    preview: {
        // this ensures that the browser opens upon preview start
        open: true,
        // this sets a default port to 3000
        port: 3007
    }
});
