import {Hono} from "hono";
import {serve} from "@hono/node-server";
import pg from "pg";

const postgres = new pg.Pool({
    user:"postgres"
});
const app = new Hono();

app.get("/api/grunnskoler", async (c) => {
    const result = await postgres.query(`
                select s.skolenavn, 
                       s.eierforhold,
                       s.antallelever,
                       s.organisasjonsnummer,
                       ST_AsGeoJSON(ST_Transform(posisjon,4326))::json as geometry
                from
                    grunnskoler_26f23a96d4914f1dbde464c9bd921e8c.grunnskole s
                        inner join
                    fylker_ba7aea2735714391a98b1a585644e98a.fylke f on st_contains(f.omrade, s.posisjon)
                        join fylker_ba7aea2735714391a98b1a585644e98a.administrativenhetnavn a on f.objid = a.fylke_fk
                        and a.sprak = 'nor'
                where a.navn = 'Viken'`);
    return c.json({
        type: "FeatureCollection",
        features: result.rows.map(({geometry, ...properties}) => ({type: "Feature", properties, geometry})),
    });
});
serve(app);