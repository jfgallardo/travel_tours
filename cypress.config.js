const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "f8tuaa",

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },
});
