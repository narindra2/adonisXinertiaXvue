// vite.config.ts
import { defineConfig } from "file:///E:/Projet%20en%20cours/AdonijsxVue/node_modules/vite/dist/node/index.js";
import { getDirname } from "file:///E:/Projet%20en%20cours/AdonijsxVue/node_modules/@adonisjs/core/build/src/helpers/main.js";
import inertia from "file:///E:/Projet%20en%20cours/AdonijsxVue/node_modules/@adonisjs/inertia/build/src/plugins/vite.js";
import vue from "file:///E:/Projet%20en%20cours/AdonijsxVue/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import adonisjs from "file:///E:/Projet%20en%20cours/AdonijsxVue/node_modules/@adonisjs/vite/build/src/client/main.js";
var __vite_injected_original_import_meta_url = "file:///E:/Projet%20en%20cours/AdonijsxVue/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [inertia({ ssr: { enabled: false } }), vue(), adonisjs({ entrypoints: ["inertia/app/app.ts"], reload: ["resources/views/**/*.edge"] })],
  /**
   * Define aliases for importing modules from
   * your frontend code
   */
  resolve: {
    alias: {
      "~/": `${getDirname(__vite_injected_original_import_meta_url)}/inertia/`
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxQcm9qZXQgZW4gY291cnNcXFxcQWRvbmlqc3hWdWVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXFByb2pldCBlbiBjb3Vyc1xcXFxBZG9uaWpzeFZ1ZVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovUHJvamV0JTIwZW4lMjBjb3Vycy9BZG9uaWpzeFZ1ZS92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgeyBnZXREaXJuYW1lIH0gZnJvbSAnQGFkb25pc2pzL2NvcmUvaGVscGVycydcbmltcG9ydCBpbmVydGlhIGZyb20gJ0BhZG9uaXNqcy9pbmVydGlhL2NsaWVudCdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IGFkb25pc2pzIGZyb20gJ0BhZG9uaXNqcy92aXRlL2NsaWVudCdcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW2luZXJ0aWEoeyBzc3I6IHsgZW5hYmxlZDogZmFsc2UgfSB9KSwgdnVlKCksIGFkb25pc2pzKHsgZW50cnlwb2ludHM6IFsnaW5lcnRpYS9hcHAvYXBwLnRzJ10sIHJlbG9hZDogWydyZXNvdXJjZXMvdmlld3MvKiovKi5lZGdlJ10gfSldLFxuXG4gIC8qKlxuICAgKiBEZWZpbmUgYWxpYXNlcyBmb3IgaW1wb3J0aW5nIG1vZHVsZXMgZnJvbVxuICAgKiB5b3VyIGZyb250ZW5kIGNvZGVcbiAgICovXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ34vJzogYCR7Z2V0RGlybmFtZShpbXBvcnQubWV0YS51cmwpfS9pbmVydGlhL2AsXG4gICAgfSxcbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXNSLFNBQVMsb0JBQW9CO0FBQ25ULFNBQVMsa0JBQWtCO0FBQzNCLE9BQU8sYUFBYTtBQUNwQixPQUFPLFNBQVM7QUFDaEIsT0FBTyxjQUFjO0FBSm9KLElBQU0sMkNBQTJDO0FBTTFOLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFNBQVMsTUFBTSxFQUFFLENBQUMsR0FBRyxJQUFJLEdBQUcsU0FBUyxFQUFFLGFBQWEsQ0FBQyxvQkFBb0IsR0FBRyxRQUFRLENBQUMsMkJBQTJCLEVBQUUsQ0FBQyxDQUFDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQU0vSSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxNQUFNLEdBQUcsV0FBVyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
