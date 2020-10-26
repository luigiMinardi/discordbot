const {tituloEmbed, enviaMensagem, descricaoEmbed} = require('../function');
const {prefix} = require('../config.json');
const Discord = require('discord.js');
const embed = new Discord.MessageEmbed();
module.exports = {
  name: "mostra",
  description: "Mostra a imagem do seu perfil, do perfil de um servidor, de um usuario ou grupo de usuarios",
  aliases:['show','mostrar'],
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
          let mostraAvatar = message.guild.iconURL().indexOf("a_") != -1 
            ? `https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.gif?size=512` 
            : `https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.jpg?size=512`;
          return enviaMensagem(message,
            embed
              .setAuthor(
                    `Esse é o avatar da ${message.guild.name}, bela guild!`, 
                    message.guild.iconURL(), 
                    mostraAvatar)
              .setDescription(mostraAvatar.indexOf(".gif") != -1
                ? `**[Gif Link](${mostraAvatar})\n[Image Link](${message.guild.iconURL()}?size=512)**` 
                : `**[Image Link](${mostraAvatar})**`)
              .setImage(mostraAvatar)
              .setColor(message.guild.me.displayColor)
              .setFooter(message.author.username, message.author.avatarURL())
          );
      }
      if (args == "meu-avatar") {
          let mostraAvatar = message.author.avatarURL().indexOf("a_") != -1 
            ? `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.gif?size=512` 
            : `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.jpg?size=512`;
          return enviaMensagem(message,
            embed
              .setAuthor(
                    `${message.author.username}, aqui está seu avatar:`, 
                    message.author.avatarURL(), 
                    mostraAvatar)
              .setDescription(mostraAvatar.indexOf(".gif") != -1
                ? `**[Gif Link](${mostraAvatar})\n[Image Link](${message.author.displayAvatarURL()}?size=512)**` 
                : `**[Image Link](${mostraAvatar})**`)
              .setColor(message.guild.me.displayColor)
              .setImage(mostraAvatar)
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
            console.log("entrou")
              message.mentions.users.forEach(user=> {
                console.log(user.avatarURL().indexOf("a_") != -1)
                console.log("display:")
                console.log(user.displayAvatarURL())
                console.log("default:")
                console.log(user.defaultAvatarURL)
                let enviaAvatar = user.avatarURL().indexOf("a_") != -1 
                  ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.gif?size=512`
                  : `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.jpg?size=512`;
                enviaMensagem(message, 
                  embed
                    .setTitle('')
                    .setAuthor(
                      `Avatar do ${user.username}:`, 
                      user.avatarURL(),
                      enviaAvatar)
                      .setDescription(enviaAvatar.indexOf(".gif") != -1
                        ? `**[Gif Link](${enviaAvatar})\n[Image Link](${user.displayAvatarURL()}?size=512)**` 
                        : `**[Image Link](${enviaAvatar})**`)
                    .setImage(enviaAvatar)
                    .setColor(message.guild.me.displayColor)
                    .setFooter(user.username, user.avatarURL())
                );  
              });
          } else {
              let mostraAvatar = message.mentions.users.first().avatarURL().indexOf("a_") != -1 
                ? `https://cdn.discordapp.com/avatars/${message.mentions.users.first().id}/${message.mentions.users.first().avatar}.gif?size=512` 
                : `https://cdn.discordapp.com/avatars/${message.mentions.users.first().id}/${message.mentions.users.first().avatar}.jpg?size=512`;
              enviaMensagem(message, 
                embed
                  .setAuthor(
                    `Avatar do ${message.mentions.users.first().username}:`, 
                    message.mentions.users.first().avatarURL(), 
                    mostraAvatar)
                  .setTitle('')
                  .setDescription(mostraAvatar.indexOf(".gif") != -1
                    ? `**[Gif Link](${mostraAvatar})\n[Image Link](${message.mentions.users.first().displayAvatarURL()}?size=512)**` 
                    : `**[Image Link](${mostraAvatar})**`)
                  .setImage(mostraAvatar)
                  .setColor(message.guild.me.displayColor)
                  .setFooter(message.author.username, message.author.avatarURL()));
          }
      }
  }
}