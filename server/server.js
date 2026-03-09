import { Hono } from "hono";
import { serve } from "@hono/node-server";
import pg from "pg";
const postgres = new pg.Pool({
    user: "postgres"
});
const app = new Hono();
app.get("/api/grunnskoler", async (c) => {
    const result = await postgres.query(`
                select skolenavn, 
                       antallelever, 
                       organisasjonsnummer,
                       ST_AsGeoJSON(posisjon)::json as geometry
                from grunnskoler_26f23a96d4914f1dbde464c9bd921e8c.grunnskole`);
    return c.json({
        type: "FeatureCollection",
        features: result.rows.map(({ geometry, ...properties }) => ({ type: "Feature", properties, geometry })),
    });
});
serve(app);
//# sourceMappingURL=server.js.map