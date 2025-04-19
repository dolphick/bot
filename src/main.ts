import Config from "../config.json";
import Discord from "./discord/discord";
import Web from "./web/web";

export const config = Config;
export const discord = new Discord();
export const web = new Web();