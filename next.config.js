/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { domains: ["res.cloudinary.com"] },
};

module.exports = nextConfig;

// module.exports = {
//   serverRuntimeConfig: {
//     apiUrl: process.env.DOCKER_API_URL, // http://your-strapi-docker-container-name:1337
//   },
//   publicRuntimeConfig: {
//     apiUrl: process.env.CLIENT_API_URL, // http://localhost:1337
//   },
// };
