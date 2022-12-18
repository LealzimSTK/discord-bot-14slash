const { messageLink } = require("discord.js")
const Discord = require("discord.js")

module.exports = {
  name: "anunciar", // Nome do comando
  description: "Anuncie algo em uma embed.", // Descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "título",
      description: "Escreva algo.",
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "descrição",
      description: "Escreva algo.",
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "chat",
      description: "Mencione um canal.",
      type: Discord.ApplicationCommandOptionType.Channel,
      required: true,
    },
    {
      name: "thumbnail",
      description: "Link",
      type: Discord.ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: "cor",
      description: "Coloque uma cor em hexadecimal.",
      type: Discord.ApplicationCommandOptionType.String,
      required: false,
    }
  ],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
      interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
    } else {
      let titulo = interaction.options.getString("título")
      let desc = interaction.options.getString("descrição")
      let cor = interaction.options.getString("cor")
      let thumbnail = interaction.options.getString("thumbnail")
      if (!cor) cor = "Random"
      let chat = interaction.options.getChannel("chat")
      if (Discord.ChannelType.GuildText !== chat.type) return interaction.reply(`❌ Este canal não é um canal de texto para enviar uma mensagem.`)

      let embed = new Discord.EmbedBuilder()
        .setTitle(titulo)
        .setDescription(desc)
        .setThumbnail(thumbnail)
        .setAuthor({
          iconURL: interaction.user.displayAvatarURL(),
          name: interaction.user.tag
        })

        .setColor(cor);

      chat.send({ embeds: [embed] }).then(() => {
        interaction.reply(`✅ Seu anúncio foi enviado em ${chat} com sucesso.`)
      }).catch((e) => {
        interaction.reply(`❌ Algo deu errado.`)
      })
    }

  }
}