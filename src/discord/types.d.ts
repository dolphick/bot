import { SlashCommandBuilder } from "discord.js";

export interface Command {
    data: SlashCommandBuilder;
    execute: Function;
}