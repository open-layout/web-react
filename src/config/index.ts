export default {
  name: 'OpenLayouts',
  impotant_message: "This site is under development",
  npm_command: 'npx install open-layout',
  // Api utilities
  api: {
    baseurl: process.env.NODE_ENV === 'development' ? 'http://localhost:4553/v0' : 'https://api.openlayout.me/v0',
    headers: { 'x-ol-client': 'open-layout-react-web' },
  },
  badges: {
    fullpath: '@/assets/badges/',
  },
  not_found: {
    img_api: 'https://cataas.com/cat/gif/says/404?fontColor=red&fontSize=20&width=100&heith=100', /* should return an image */
  }
};