import express, { Express } from "express";
import { config, discord } from "../main";
import { ActivityType } from "discord.js";

export default class Web {
    constructor() {
        const app = express();

        app.use(express.static("./src/web/public/"));
        app.use(express.urlencoded({extended: true}));
        app.use(express.json());

        app.get("/api/ping", (request, response) => {
            response.json({ping: discord.client.ws.ping});
        });

        app.post("/api/status/online", (request, response) => {
            discord.client.user?.setStatus("online");
            response.send("OK");
        })

        app.post("/api/status/idle", (request, response) => {
            discord.client.user?.setStatus("idle");
            response.send("OK");
        })

        app.post("/api/status/dnd", (request, response) => {
            discord.client.user?.setStatus("dnd");
            response.send("OK");
        })

        app.post("/api/status/invisible", (request, response) => {
            discord.client.user?.setStatus("invisible");
            response.send("OK");
        })

        app.post("/api/activity/playing", (request, response) => {
            discord.client.user?.setActivity(request.body.name, {type: ActivityType.Playing})
            response.send("OK");
        })

        app.post("/api/activity/streaming", (request, response) => {
            discord.client.user?.setActivity(request.body.name, {type: ActivityType.Streaming})
            response.send("OK");
        })

        app.post("/api/activity/listening", (request, response) => {
            discord.client.user?.setActivity(request.body.name, {type: ActivityType.Listening})
            response.send("OK");
        })

        app.post("/api/activity/watching", (request, response) => {
            discord.client.user?.setActivity(request.body.name, {type: ActivityType.Watching})
            response.send("OK");
        })

        app.get("/api/stats/ping", (request, response) => {
            response.json(Object.fromEntries(discord.stats));
        })

        this.app = app;

        app.listen(config.web.port, () => {
            console.log(`[Web] Ready on http://localhost:${config.web.port}`);
        });
    }

    app: Express;
}