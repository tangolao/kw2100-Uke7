import {Hono} from "hono";
import {serve} from "@hono/node-server";
import pg from "pg";

const postgres = new pg.Pool({
    user:"postgres"
});
const app = new Hono();

app.get("/api/grunnskoler", async (c) => {
    const result = await postgres.query(`
                select skolenavn, 
                       antallelever, 
                       organisasjonsnummer, 
                       posisjon 
                from grunnskoler_eacac061675b438687e28fbd6f60bf68.grunnskole`);
    return c.json(result.rows);
});
serve(app);