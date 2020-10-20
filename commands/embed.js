const {enviaMensagem} = require('../function');
const {prefix} = require('../config.json');
const Discord = require("discord.js");
const embed = new Discord.MessageEmbed();
module.exports = {
  name: 'embed',
  description: 'Cria uma embed',
  usage: `<color> <#hexadecimal>\n${prefix}embed <role> <@cargo>\`\`\n__Para uma descrição mais detalhada use:__ \n\`\`${prefix}embed <color>\`\`\n_O \`\`${prefix}embed <role>\`\` só pode ser usado por adms e alguns outros para não incomodar todo mundo com @'s desnecessários._\n __Se quiser checar se você pode usar o comando digite:__\n\`\`${prefix}embed <role>`,
  category: "utilidade",
  args: true,
  Perm_Args: "role",
  permission: ['MENTION_EVERYONE', 'MANAGE_MESSAGES', 'MANAGE_ROLES'],
  execute(message, args){
    if (args[0] === "color"){
      const hex = /[0-9A-Fa-f]{6}/g;
      if(!hex.test(args[1])){
          embed;
          return enviaMensagem(message, 
            embed
              .setColor("#FFFF62")  
              .setDescription(`Coloque uma **cor hexadecimal** valida:
          
          Tente [pegar um hexadecimal aqui](https://htmlcolorcodes.com/).

          Ou [converta um RGB/RGBA pra Hexadecimal aqui](https://cssgenerator.org/rgba-and-hex-color-generator.html).
          
          Não sabe o que é uma cor hexadecimal?
          [confira o que é uma cor hexadecimal aqui](https://medium.com/origamid/cores-em-hexadecimal-memor%C3%A1veis-cc939511753c).
          `));
      } else {
          return enviaMensagem(message, 
            embed
              .setColor(args[1])
              .setDescription(`${args.slice(2).toString().trim().replace(/,/g," ")}`));
      }
    }else if (message.channel.type !== 'dm'){
      if (args[0] === "role"){
        if(message.mentions.roles.first() == undefined){
          return message.reply(
            embed
              .setColor(message.guild.me.displayColor)
              .setFooter(message.author.username, message.author.avatarURL())
              .setTitle("Ei, você não marcou nenhum cargo pro comando funcionar!")
              .setDescription(`_A forma correta seria:_
               \`\`${prefix}embed role @cargo\`\``));
        }
        return (
          enviaMensagem(message, 
          embed
            .setTitle('')
            .setFooter('')
            .setColor(message.mentions.roles.first().color)
            .setDescription(`${args.slice(1).toString().trim().replace(/,/g," ")}`)),
          message.author.send(embed.setDescription(`Caso a cor não seja a mesma do cargo marcado é porque você marcou mais de um cargo.
           Crie outra embed mencionando só um cargo ou use o \`\`${prefix}embed color <cor>\`\` com a cor de sua preferência em hexadecimal.
           
           **[Voltar para o servidor de origem](${message.url})**`))
        );
      }
    }else if (message.channel.type === 'dm'){
      if (args[0] === "role"){
        return enviaMensagem(message, "Esse comando não pode ser usado no Privado(DM)!");
      }
    }
  }
}