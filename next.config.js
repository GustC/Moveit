module.exports = {
    async headers() {
      return [
        {
          // matching all API routes
          source: "/api/:path*",
          headers: [
            { key: "Access-Control-Allow-Credentials", value: "true" },
            { key: "Access-Control-Allow-Origin", value: "*" },
            { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
            { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
          ],
          
        }
      ]
    },
    env: {
      GIT_CLIENT_KEY: '77f6f5bb614d2e61b443',
      GIT_CLIENT_SECRET: '0fda6d68c26d33813e752b157ccc15c73cf3828b'
    },
  };