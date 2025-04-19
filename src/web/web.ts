import express, { Express } from "express";
import { config, discord } from "../main";
import { ActivityType } from "discord.js";

export default class Web {
    constructor() {
        const app = express();

        app.get("/api/ping", (request, response) => {
            response.send(JSON.stringify({ping: discord.client.ws.ping}));
        });

        app.get("/api/status/online", (request, response) => {
            discord.client.user?.setStatus("online");
            response.send("OK");
        })

        app.get("/api/status/idle", (request, response) => {
            discord.client.user?.setStatus("idle");
            response.send("OK");
        })

        app.get("/api/status/dnd", (request, response) => {
            discord.client.user?.setStatus("dnd");
            response.send("OK");
        })

        app.get("/api/status/invisible", (request, response) => {
            discord.client.user?.setStatus("invisible");
            response.send("OK");
        })

        app.post("/api/activity/playing", (request, response) => {
            discord.client.user?.setActivity(request.body.JSON.name, {type: ActivityType.Playing})
            response.send("OK");
        })

        app.post("/api/activity/streaming", (request, response) => {
            discord.client.user?.setActivity(request.body.JSON.name, {type: ActivityType.Streaming})
            response.send("OK");
        })

        app.post("/api/activity/listening", (request, response) => {
            discord.client.user?.setActivity(request.body.JSON.name, {type: ActivityType.Listening})
            response.send("OK");
        })

        app.post("/api/activity/watching", (request, response) => {
            discord.client.user?.setActivity(request.body.JSON.name, {type: ActivityType.Watching})
            response.send("OK");
        })

        this.app = app;

        app.listen(config.web.port, () => {
            console.log(`[Web] Ready on http://localhost:${config.web.port}`);
        });
    }

    app: Express;
}