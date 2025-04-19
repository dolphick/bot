import {Client, Events, Routes } from "discord.js";
import { discord } from "../../main";

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client: Client<true>) {
		await client.rest.put(Routes.applicationCommands(client.application.id) ,{body:discord.commands.rest});
		console.log("[Discord] Ready");
		discord.stats.set(Math.trunc(new Date().getTime()/1000), client.ws.ping);
		setInterval(() => {
			discord.stats.set(Math.trunc(new Date().getTime()/1000), client.ws.ping);
		}, 60000)	  
	}
};
