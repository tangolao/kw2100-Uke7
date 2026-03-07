import {Hono} from "hono";
import {serve} from "@hono/node-server";

const app = new Hono();

app.get("/api/grunnskoler", c => c.json({
    hello:"World"
}))

serve(app);