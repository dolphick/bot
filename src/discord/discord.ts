import { Client, Collection } from "discord.js";
import fs from "fs";
import path from "path";
import { Command } from "./types";
import { RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord-api-types/v10";
import { config } from "../main";

export default class Discord {
	constructor() {
		let token = config.discord.token.main;
		if (process.argv[2] === "develop") {
			token = config.discord.token.develop
		}

		const client = new Client({intents: []});

		// イベント処理読み込み
		const eventsPath = path.join(__dirname, "events");
		const eventFiles = fs.readdirSync(eventsPath);
		for (const file of eventFiles) {
			const event = require(path.join(eventsPath, file));
			if (event.once) {
				client.once(event.name, (...args) => event.execute(...args));
			}
			else {
				client.on(event.name, (...args) => event.execute(...args));
			}
		}

		// スラッシュコマンド読み込み
		const commands = {collection: new Collection<string, Command>(), rest: new Array<RESTPostAPIChatInputApplicationCommandsJSONBody>};
		const commandsPath = path.join(__dirname, "interactions/commands");
		const commandFiles = fs.readdirSync(commandsPath);
		for (const file of commandFiles) {
			const command: Command = require(path.join(commandsPath, file));
			commands.collection.set(command.data.name, command);
			commands.rest.push(command.data.toJSON());
		}

		this.client = client
		this.commands = commands;

		client.login(token);
	}

	client: Client<boolean>;
	commands: { collection: Collection<string, Command>; rest: RESTPostAPIChatInputApplicationCommandsJSONBody[]; };
}