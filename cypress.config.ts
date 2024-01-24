import { defineConfig } from "cypress";

export default defineConfig({
  viewportWidth: 1280,
  viewportHeight: 1080,
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
    },
  },
});
