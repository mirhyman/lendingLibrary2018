module.exports = {
  apps: [
    {
      name: 'API',
      script: 'app.js',
      max_restarts: 4,
      node_args: "--debug=5859",
      watch: ["./src/**/*.js", "app.js"]

    }
  ]
 };