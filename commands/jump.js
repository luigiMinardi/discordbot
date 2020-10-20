const {enviaMensagem} = require('../function');
const {prefix} = require('../config.json');
const Discord = require('discord.js');
const embed = new Discord.MessageEmbed();
module.exports = {
  name: 'jump',
  description: `Da jump em uma mensagem \n(\`\`${prefix}jump server\`\` consegue dar jumps entre servidores mas pode bugar e só funciona com quem já está nos 2 servidores ligados (o que você digitou a mensagem e o que você vai ser "jumpado"))`,
  usage: `<id do canal> <id da mensagem> <mensagem que você quer que o jump tenha>\n${prefix}jump server <id do server> <id do canal> <id da mensagem> <mensagem que você quer que o jump tenha>`,
  category: "utilidade",
  args: true,
  execute(message, args){
    //https://discordapp.com/channels/XXXXXX/XXXXXX/XXXXXX
    /*console.log("guild id: "+message.guild.id);
    console.log("channel id: "+message.channel.id);
    console.log("id da msg: "+message.id);
    console.log("id author:"+ message.author.id);*/
    if (args[0] === "server"){
      if(args.lenght < 2){
        return enviaMensagem(message, `Você não passou todos os argumentos necessários pro comando funcionar. digite \`\`${prefix}jump\`\` pra ver como fazer.`);
      }
      return enviaMensagem(message,
        embed
          .setColor("#7CA0EB")
          .setDescription(`**[${args.slice(4).toString().trim().replace(/,/g," ")}](https://discordapp.com/channels/${args[1]}/${args[2]}/${args[3]})**`));
    }else if (message.channel.type !== 'dm'){
      return enviaMensagem(message,
        embed
          .setColor(message.guild.me.displayColor)
          .setDescription(`**[${args.slice(2).toString().trim().replace(/,/g," ")}](https://discordapp.com/channels/${message.guild.id}/${args[0]}/${args[1]})**`));
    } else if (message.channel.type === 'dm'){
      enviaMensagem(message, `Não posso enviar esse comando pelo DM, use \`\`${prefix}jump server\`\` e vá para um servidor que queira.`);
    }
  }
}