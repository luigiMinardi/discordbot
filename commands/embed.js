const {enviaMensagem} = require('../function');
const {prefix} = require('../config.json');
const Discord = require("discord.js");
const embed = new Discord.MessageEmbed();
module.exports = {
  name: 'embed',
  description: 'Cria uma embed com a sua mensagem',
  usage: `<color> <#hexadecimal> <mensagem>\n${prefix}embed <role> <@cargo> <mensagem>\`\`
  \`\`${prefix}embed <marca> <#corHex> <@cargos> <fim> <mensagem>\`\`

  __Para uma descrição mais detalhada use:__ 
  \`\`${prefix}embed <color>\`\`
  _O \`\`${prefix}embed <role>\`\`e o \`\`${prefix}embed <marca>\`\` só podem ser usados por adms e alguns outros para não incomodar todo mundo com @'s desnecessários._
   __Se quiser checar se você pode usar o comando digite:__
   \`\`${prefix}embed <role>\`\`
   \`\`${prefix}embed <marca>`,
  category: "utilidade",
  args: true,
  Perm_Args: ["role","marca"],
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
      }else if (args[0] === "marca") {
        const hex = /#[0-9A-Fa-f]{6}/g;
        //checa se o membro colocou alguma cor | VV
        if(!hex.test(args[1])){
          return enviaMensagem(message,
            embed
              .setColor("#FFFF62")
              .setDescription(`Coloque uma **cor hexadecimal** valida:
          
          Tente [pegar um hexadecimal aqui](https://htmlcolorcodes.com/).

          Ou [converta um RGB/RGBA pra Hexadecimal aqui](https://cssgenerator.org/rgba-and-hex-color-generator.html).
          
          Não sabe o que é uma cor hexadecimal?
          [confira o que é uma cor hexadecimal aqui](https://medium.com/origamid/cores-em-hexadecimal-memor%C3%A1veis-cc939511753c).
          `));
        //checa se o membro marcou algum cargo | VV
        }else if(message.mentions.roles.first() == undefined){
          return message.reply(
            embed
              .setColor(message.guild.me.displayColor)
              .setFooter(message.author.username, message.author.avatarURL())
              .setTitle("Ei, você não marcou nenhum cargo pro comando funcionar!")
              .setDescription(`_A forma correta seria:_
               \`\`${prefix}embed marca #corHex @cargos fim mensagem\`\`
               Você pode marcar quantos cargos quiser, por isso quando marcar o ultimo cargo coloque o \`\`fim\`\` depois pra que tudo funcione corretamente.`));
        } else {
          console.log(args)
          let achouFinal;
          for (let i = 0; i < args.length; i++) {
            if(args[i] === "fim"){
              achouFinal = args.indexOf(args[i]);
              i = args.length;
            }
          }

          let indexDoMembroNoLugarErrado;
          let membroNoLugarErrado;
          const encontraIndexDoCargo = args.map(arg => {
            const procuraCargos = new RegExp(/&[0-9]{18}/g);
            const membroOuCargo = /![0-9]{18}/g;
            
            if (arg && membroOuCargo.test(arg) && args.indexOf(arg) < achouFinal) {
              //retorna o index do membro
              indexDoMembroNoLugarErrado = args.indexOf(arg);
              //retorna o nome do membro
              membroNoLugarErrado = arg;
              return "membro";
            }else if(arg && procuraCargos.test(arg)){
              //retorna os cargos existentes para serem marcados
              return args.indexOf(arg)
            }
          })
          
          let indexDosCargos = Array();
          indexDosCargos = encontraIndexDoCargo.filter(arg => arg !== undefined); 
        
          let cargos = Array();
          //caso o usuario nao tenha colocado o "fim" nao faça o comando rodar normalmente
          if(achouFinal === undefined){
            cargos = "Faltou algo...";
            indexDosCargos = -3;

            args = `${message.author.username} você não colocou o \`\`fim\`\` depois dos cargos. Cheque como fazer em:
             \`\`${prefix}embed marca\`\` `;

          } else if(indexDosCargos.find(arg => arg === "membro")){
            cargos = "Algo deu errado...";
            indexDosCargos = -3;

            args = `${message.author.username} você colocou um Usuario \"${membroNoLugarErrado}\" antes do \`\`fim\`\` dos cargos.
            o usuario é a \`\`${indexDoMembroNoLugarErrado}\`\`ª coisa no seu comando. 
            *Se você acha que isso é um erro por favor nos contate no servidor oficial ou fale com o dono do bot diretamente*
            Cheque como o comando deve ser feito em:
            \`\`${prefix}embed marca\`\` `

          } else {
            for (let i = 0; i < indexDosCargos.length; i++) {
              cargos.push(args[indexDosCargos[i]]);            
            }
            cargos = cargos.toString().trim().replace(/,/g," ");
          }

          return (
            enviaMensagem(message, cargos),
            enviaMensagem(message,
            embed
              .setTitle('')
              .setColor(args[1])
              .setDescription(`${args.slice(3+indexDosCargos.length).toString().trim().replace(/,/g," ")}`))
          )
        }
      }
    }else if (message.channel.type === 'dm'){
      if (args[0] === "role" || args[0] === "marca"){
        return enviaMensagem(message, "Esse comando não pode ser usado no Privado(DM)!");
      }
    }
  }
}