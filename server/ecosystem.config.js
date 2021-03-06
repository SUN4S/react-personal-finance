module.exports = {
  apps: [
    {
      name: "Personal Finance",
      script: "./build/index.js",
      watch: false,
      cwd: "./",
    },
  ],

  deploy: {
    production: {
      user: "SSH_USERNAME",
      host: "SSH_HOSTMACHINE",
      ref: "origin/master",
      repo: "GIT_REPOSITORY",
      path: "DESTINATION_PATH",
      "pre-deploy-local": "",
      "post-deploy": "npm install && pm2 reload ecosystem.config.ts --env production",
      "pre-setup": "",
    },
  },
};
