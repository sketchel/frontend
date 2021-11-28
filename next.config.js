const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  images: {
    domains: [
      'cdn.sketchel.com'
    ]
  },
  pwa: {
    dest: 'public',
    runtimeCaching,
  }
});