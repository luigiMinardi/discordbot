const {tituloEmbed, enviaMensagem, descricaoEmbed} = require('../function');
const {prefix} = require('../config.json');
const Discord = require('discord.js');
const embed = new Discord.MessageEmbed();
module.exports = {
  name: "mostra",
  description: "Mostra a imagem do seu perfil, do perfil de um servidor, de um usuario ou grupo de usuarios",
  aliases:['show'],
  usage: `<guild> \n${prefix}mostra <meu-avatar>\n${prefix}mostra <avatar> <@usuario>\n${prefix}mostra <avatar> <array> <@usuario1> <@usuario2>\`\`\n__Para uma descrição mais detalhada use:__ \n\`\`${prefix}mostra`,
  category: 'utilidade',
  guildOnly: true,
  execute(message, args){
      if (!args.length){
          tituloEmbed(message, `O que você quer mostrar?`)
          return enviaMensagem(message, descricaoEmbed(message, `
          -Para mostrar o icone da guild use:
          **+mostra guild**

          -Para mostrar o seu proprio avatar use:
          **+mostra meu-avatar**

          -Para mostrar o avatar de outros usuarios use:
          **+mostra avatar @**
          Por exemplo: **+mostra avatar ${message.guild.me}**
          (Para mostrar meu lindo avatar!)
          
          -Para mostrar avatares de varios usuarios de uma vez use:
          **+mostra avatar array @'s**
          Por exeplo: **+mostra avatar array ${message.guild.me} ${message.author}**
          (Para mostrar nossos lindos avatares!)`));
      }
      if (args == "guild") {
          let mostraAvatar = message.guild.iconURL();
          return enviaMensagem(message, 
            embed
              .setAuthor(
                    `Esse é o avatar da ${message.guild.name}, bela guild!`, 
                    message.guild.iconURL(), 
                    mostraAvatar+"?size=256")
              .setDescription(`[Image Link](${mostraAvatar}?size=256)`)
              .setImage(mostraAvatar+"?size=256")
              .setColor(message.guild.me.displayColor)
              .setFooter(message.author.username, message.author.avatarURL())
          );
      }
      if (args == "meu-avatar") {
          let mostraAvatar = message.author.displayAvatarURL();
          return enviaMensagem(message,
            embed
              .setAuthor(
                    `${message.author.username}, aqui está seu avatar:`, 
                    message.author.avatarURL(), 
                    mostraAvatar+"?size=256")
              .setDescription(`[Image Link](${mostraAvatar}?size=256)`)
              .setColor(message.guild.me.displayColor)
              .setImage(mostraAvatar+"?size=256")
              .setFooter(message.author.username, message.author.avatarURL())
          );
      }
      if (args[0] == "avatar"){
          if(message.mentions.users.size == 0){
              return enviaMensagem(message,
                embed
                  .setImage('')
                  .setTitle(`Você precisa marcar alguém pro comando funcionar :)`)
                  .setColor(message.guild.me.displayColor)
                  .setFooter(message.author.username, message.author.avatarURL())
                  .setDescription(`Por exeplo: **+mostra avatar ${message.guild.me}**
                (Para mostrar meu lindo avatar!)

                Ou então você pode pedir varios avatares de uma vez usando o **avatar array**
                Por exeplo: **+mostra avatar array ${message.guild.me} ${message.author}**
                (Para mostrar nossos lindos avatares ao mesmo tempo!)`)
              );
          }else if(args[1] == "array"){
              let mentionedUser = message.mentions.users.array();
              for (let i = 0; i < mentionedUser.length; i++) {
                  let enviaAvatar = mentionedUser[i].displayAvatarURL();
                  enviaMensagem(message, 
                    embed
                      .setAuthor(
                        `Avatar do ${mentionedUser[i].username}:`, 
                        mentionedUser[i].avatarURL(), 
                        enviaAvatar+"?size=256")
                      .setDescription(`[Image Link](${enviaAvatar}?size=256)`)
                      .setImage(enviaAvatar+"?size=256")
                      .setColor(message.guild.me.displayColor)
                      .setFooter(mentionedUser[i].username, mentionedUser[i].avatarURL())
                  );  
                  //console.log("Envia avatar = " + enviaAvatar);         
              }
              /*
              console.log("Mostra avatares = "+ mentionedUser);
              console.log("Users size = " + message.mentions.users.size);
              console.log("Avatares length = " +mentionedUser.length);//*/
          } else {
              let mostraAvatar = message.mentions.users.first().displayAvatarURL();
              enviaMensagem(message, 
                embed
                  .setAuthor(
                    `Avatar do ${message.mentions.users.first().username}:`, 
                    message.mentions.users.first().avatarURL(), 
                    mostraAvatar+"?size=256")
                  .setTitle('')
                  .setDescription(`[Image Link](${mostraAvatar}?size=256)`)
                  .setImage(mostraAvatar+"?size=256")
                  .setColor(message.guild.me.displayColor)
                  .setFooter(message.author.username, message.author.avatarURL()));
          }
      }
  }
}