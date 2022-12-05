const { Client, GatewayIntentBits, GuildMember, Embed } = require("discord.js");
const { EmbedBuilder } = require("@discordjs/builders")

const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ]
});

bot.once("ready", () => {
  console.log("BOT IS ONLINE");
})

bot.on("messageCreate", (message) => {
  if (message.author.bot) return false;
  const content = message.content.toLowerCase()
  const channel = message.channel
  if (content === "hello") {
    channel.send(`hello ${message.author.username}`)
  }
  console.log(message.channelId)
})

bot.on("guildMemberAdd", (member) => {
  const { user, guild } = member
  const channel = member.guild.channels.cache.get("1034695954621808703");
  welcomeMsg = `🌻 Welcome to Science Family ${user}! 🌻`;

  const welcome = new EmbedBuilder()
    .addFields({ name: "member count", value: `${guild.memberCount}` })
    .setTitle("*Welcome to Science Family*")
    .setColor(0xFFCA18)
    .setDescription(welcomeMsg);
  channel.send({ embeds: [welcome] });
});

bot.on("guildMemberRemove", (member) => {
  const { user, guild } = member
  const channel = member.guild.channels.cache.get("1034695954621808703");
  leaveMsg = `🌻 ${user} just left Science Family 🌻`;

  const goodbye = new EmbedBuilder()
    .addFields({ name: "Member count", value: `${guild.memberCount}` })
    .setTitle("*Sad to see you go :cry:*")
    .setColor(0xFFCA18)
    .setDescription(leaveMsg);
  channel.send({ embeds: [goodbye] });
});

bot.login(process.env['TOKEN']);
