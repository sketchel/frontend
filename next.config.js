const withPWA = require('next-pwa');

module.exports = withPWA({
  images: {
    domains: [
      'cdn.sketchel.com'
    ]
  },
  pwa: {
    dest: 'public'
  }
});