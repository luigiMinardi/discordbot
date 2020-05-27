const fs = require('fs');

const Discord = require("discord.js");

const config = require("./config.json");

const client = new Discord.Client();

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on("ready", () =>{
    console.log(`${client.user.username} foi iniciado, com ${client.users.cache.size} usuarios, em ${client.guilds.cache.size} servidores!`);
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(`Em Manutenção`, {type:'LISTENING'});
});

client.on("guildCreate", guild => {
    console.log(`O bot entrou no servidor ${guild.name} (id: ${guild.id}). População: ${guild.memberCount} membros!`);
    console.log(`Estou em ${client.guilds.cache.size} servidores!`);
}); 

client.on("guildDelete", guild => {
    console.log(`O bot foi removido do servidor: ${guild.name} (id: ${guild.id}).`);
    console.log(`Estou em ${client.guilds.cache.size} servidores!`);
});

client.on("message", async message => {
    if(!message.content.startsWith(config.prefix) || message.author.bot || message.channel.type === "dm") return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);

    const commandName =  args.shift().toLowerCase();

    if(!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
        command.execute(message, args);
    }catch (error){
        console.error(error);
        message.reply("Deu um erro ao tentar executar esse comando!");
    }
});

client.login(config.token);
