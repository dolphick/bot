import { CommandInteraction, Events, MessageFlags } from "discord.js";
import { discord } from "../../main";

module.exports = {
	name: Events.InteractionCreate,
	once: false,
	async execute(interaction: CommandInteraction) {
		if (interaction.isChatInputCommand()) {
			const command = discord.commands.collection.get(interaction.commandName);
			if (!command) return;

			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(error);
				if (interaction.replied || interaction.deferred) {
					await interaction.followUp({ content: "エラーが発生したため、コマンドの実行を停止しました", flags: MessageFlags.Ephemeral });
				} else {
					await interaction.reply({ content: "エラーが発生したため、コマンドの実行を停止しました", flags: MessageFlags.Ephemeral });
				}
			}
		}
	},
};
