import express from "express";
import { config } from "../main";

export default class Web {
    constructor() {
        const web = express();

        web.get('/ping', (request, response) => {
            response.send("OK");
        });

        web.listen(config.web.port, () => {
            console.log(`[Web] Ready on http://localhost:${config.web.port}`);
        });
    }
}