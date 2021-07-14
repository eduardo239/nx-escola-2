const path = require('path');

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['i.imgur.com', 'lkjdvpqdsyneokvxbctv.supabase.co'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};
