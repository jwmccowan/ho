/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === "development";
module.exports = {
  reactStrictMode: isDev,
};
