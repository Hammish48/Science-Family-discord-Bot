const { Client, GatewayIntentBits, GuildMember, Embed, REST, Routes } = require("discord.js");
const { EmbedBuilder } = require("@discordjs/builders")

const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ]
});
const commands = [
  {
    name: "test",
    description: "a test"
  }
]

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

bot.on('interactionCreate', async action => {
  if (action.isChatInputCommand() == false) {
    return;
  }

  if (action.commandName === 'test') {
    await action.reply('hi');
  }
});
const rest = new REST({ version: '10' }).setToken(process.env['TOKEN']);
(async () => {
  try {
    await rest.put(Routes.applicationCommands("1049197120562933781"), { body: commands });

    console.log('commands enabled');
  } catch (error) {
    console.error(error);
  }
})();

bot.login(process.env['TOKEN']);
