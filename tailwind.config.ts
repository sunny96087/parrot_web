/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './utils/**/*.{js,ts}',
    './{App,app}.{js,ts,vue}',
    './{Error,error}.{js,ts,vue}',
    './app.config.{js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        // 'Primary-Orange': '#EA580C',
        // 'Primary-Dark': '#E1580E',
        // hr ------------
        blue1: '#e9f1fe',
        blue2: '#c4d7ed',
        blue3: '#abc8e2',
        blue4: '#375d81',
        blue5: '#183152',
        red1: '#ffaeaa',
        red2: '#ed6f69',
        bg: '#fff6ea'
      }
    }
  },
  plugins: []
}
