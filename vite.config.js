import { defineConfig } from "vite";
export default defineConfig({
    server: {
        proxy: {
            "/api": "http://localhost:3000",
        },
    },
});
//# sourceMappingURL=vite.config.js.map