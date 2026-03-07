import { Hono } from "hono";
import { serve } from "@hono/node-server";
const app = new Hono();
app.get("/api/hello", c => c.json({
    hello: "World"
}));
serve(app);
//# sourceMappingURL=server.js.map