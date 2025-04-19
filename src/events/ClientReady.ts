import { Client, Events, Routes } from "discord.js";
import { commands } from "../main";

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client: Client<true>) {
		await client.rest.put(Routes.applicationCommands(client.application.id) ,{body:commands.rest});
	}
};