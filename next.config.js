const path = require('path');

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['i.imgur.com', 'skpquxxzpjcxtzckwszq.supabase.co'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};
