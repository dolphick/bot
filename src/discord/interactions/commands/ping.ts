import { CommandInteraction, SlashCommandBuilder } from "discord.js";

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("ping!"),
	async execute(interaction: CommandInteraction) {
		await interaction.reply(`Pong! ${interaction.client.ws.ping}ms`);
	}
};