// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-swiper',
    'nuxt-icon',
    '@pinia/nuxt',
    [
      '@funken-studio/sitemap-nuxt-3',
      { generateOnBuild: true, hostname: 'https://parrot.2fishs.com/' }
    ]
  ],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: '鸚鸚食堂 Parrot Bistro',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content:
            '一起來計算如何讓鸚鵡吃的健康和營養均衡吧！鸚鸚食堂 Parrot Bistro, 鸚鵡, 飼養, 餵食, 食物, 飼料, 健康, 營養, 和尚鸚鵡, 寵物, 鳥類, 鳥, bird, parrot, monk parakeet, pet, food, feed, health, nutrition, monk parrot'
        },
        { name: 'format-detection', content: 'telephone=no' },
        { property: 'og:locale', content: 'tw' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: '鸚鸚食堂 Parrot Bistro' },
        {
          property: 'og:description',
          content:
            '一起來計算如何讓鸚鵡吃的健康和營養均衡吧！鸚鸚食堂 Parrot Bistro, 鸚鵡, 飼養, 餵食, 食物, 飼料, 健康, 營養, 和尚鸚鵡, 寵物, 鳥類, 鳥, bird, parrot, monk parakeet, pet, food, feed, health, nutrition, monk parrot'
        },
        { property: 'og:url', content: 'https://parrot.2fishs.com/' },
        { property: 'og:site_name', content: '鸚鸚食堂 Parrot Bistro' },
        { property: 'twitter:card', content: 'summary_large_image' },
        {
          property: 'twitter:description',
          content:
            '一起來計算如何讓鸚鵡吃的健康和營養均衡吧！鸚鸚食堂 Parrot Bistro, 鸚鵡, 飼養, 餵食, 食物, 飼料, 健康, 營養, 和尚鸚鵡, 寵物, 鳥類, 鳥, bird, parrot, monk parakeet, pet, food, feed, health, nutrition, monk parrot'
        },
        { property: 'twitter:title', content: '鸚鸚食堂 Parrot Bistro' }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      script: [
        {
          type: 'text/javascript',
          innerHTML: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "mwgwkagf2w");
          `,
          charset: 'utf-8'
        }
      ],
      __dangerouslyDisableSanitizers: ['script']
    }
  },
  plugins: ['~/plugins/vue-gtag.client.ts']
})
