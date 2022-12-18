const Discord = require("discord.js");
const malScraper = require('mal-scraper');
const translate = require("@iamtraction/google-translate");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

const config = require("./config.json")

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds
  ]
});

module.exports = client

client.on('interactionCreate', (interaction) => {

  if (interaction.type === Discord.InteractionType.ApplicationCommand) {

    const cmd = client.slashCommands.get(interaction.commandName);

    if (!cmd) return interaction.reply(`Error`);

    interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

    cmd.run(client, interaction)

  }
})

client.on('ready', () => {
  console.log(`🔥 ${client.user.username} marcou presença!`)
})


client.slashCommands = new Discord.Collection()

require('./handler')(client)

client.login(config.token)

// ANTI-LINK SYSTEM
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  let confirm = await db.get(`antilink_${message.guild.id}`);
  if (confirm === false || confirm === null) {
    return;
  } else if (confirm === true) {
    if (message.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) return;
    if (message.content.toLocaleLowerCase().includes("http")) {
      message.delete()
      message.channel.send(`${message.author} Não envie links no servidor!`)
    }

  }
})