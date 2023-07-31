/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  generateBuildId: async () => { 
    return 'controlmc' 
  },
}

module.exports = nextConfig
