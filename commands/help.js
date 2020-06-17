const { prefix } = require('../config.json');
const Discord = require("discord.js");
const {descricaoEmbed} = require('../function');
module.exports = {
	name: 'help',
	description: 'Lista todos os comandos ou informações especificas de cada comando.',
	aliases: ['commands', 'ajuda'],
  usage: '<nome do comando>',
  category: 'utilidade',
	cooldown: 5,
	execute(message, args) {
        const embed = new Discord.MessageEmbed()
        .setFooter(message.author.username, message.author.avatarURL())
        .setThumbnail(`https://media.giphy.com/media/jtKm1RJiaUByLGoCoY/giphy.gif`);

        const embedButton = new Discord.MessageEmbed();
        if(message.channel.type !== 'dm'){
            embed.setColor(message.guild.me.displayColor);
        }

        const {commands} = message.client;
        const categories = [];
        commands.filter(command => command.category !== "bot-owner").forEach(command => {
            if(categories.indexOf(command.category) === -1) categories.push(command.category);
        });

        if (!args.length){
            embed.setTitle('Aqui está a lista de todos os meus comandos:');

            for (let i = 0; i < categories.length; i++) {
                embed.addField(categories[i] != undefined ? categories[i].toUpperCase() : categories[i] ,
                    `\`\`${commands
                        .filter(command => command.category === categories[i])
                        .map(command => command.name)
                        .join('\`\`\n \`\`')}\`\``);
                if(categories[i] == undefined){
                    embed.fields.find(category => category.name == "undefined").name = "SEM CATEGORIA";
                }
            };
            embed
                .setDescription(`Você pode enviar:
                \`${prefix}help ${commands.filter(command => command.name == "help").find(command => command.usage).usage}\`
                Pra ter irformações sobre um comando específico!`);
            
            message.author.send(embed)
                .then(msg => {
                    setTimeout(function() {
                        msg.edit(embed.setThumbnail(`https://media.tenor.com/images/3c33e849afaa82b0cc2b4e51d0796df2/tenor.gif`));
                    }, 30000);
                })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                        message.reply(descricaoEmbed(message, 
                        `Eu enviei um PV(DM) pra você com todos os meus comandos!
                        **[Ir para o DM](https://discordapp.com/channels/@me/${message.author.dmChannel.id}/${message.author.dmChannel.lastMessageID})**`));
                })
                .catch(error => {
                    console.error(`Não consegui enviar o help DM para o ${message.author.tag}.\n`, error);
                    message.reply(`Parece que não consigo te enviar uma mensagem pelo PV(DM)...
                     Você por acaso desativou o seu PV?`);
                });
            if(message.channel.type !== 'dm'){
                embedButton.setColor(message.guild.me.displayColor);
                message.author.send(embedButton.setDescription(`**[Voltar para o servidor de origem](${message.url})**`));
            }
            return;
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
        if (!command){
            return message.reply("Comando inválido.");
        }
        embed.setTitle(`Comando: ${command.name}`);
        if (command.description) embed.addField(`**Descrição:**` , `${command.description}`);
        if (command.aliases) embed.addField(`**Aliases (pseudônimos):**` , `\`\`${command.aliases.join('\n')}\`\``, true);
        if (command.usage) embed.setDescription(`**Como usar:**\n\`\`${prefix}${command.name} ${command.usage}\`\``);
        embed.addField(`**Cooldown:**`, `${command.cooldown || 3} segundo(s);`, true);

        message.channel.send(embed)
            .then(msg => {
                setTimeout(function() {
                        msg.edit(embed.setThumbnail(`https://media.tenor.com/images/3c33e849afaa82b0cc2b4e51d0796df2/tenor.gif`));
                }, 30000);
            });
	},
};