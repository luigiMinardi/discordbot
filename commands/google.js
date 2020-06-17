const Discord = require("discord.js");
const {enviaMensagem} = require('../function');

module.exports = {
    name:'google',
    description:'Pesquisa algo no google',
    aliases:['pesquisa', 'search', 'goo'],
    usage: '<escreva o que quiser pesquisar>',
    category: 'utilidade',
    args: true,
    execute(message, args){
        const embed = new Discord.MessageEmbed()
        .setFooter(message.author.username, message.author.avatarURL())
        .setTitle("Aqui está sua pesquisa:")
        .setDescription(`**Você pesquisou por:** "${args.slice().toString().trim().replace(/,/g," ")}".
    \n**[Google](https://google.com/search?q=${args.slice().toString().trim().replace(/,/g,"+")}&safe=active)**
    \n**[Estou com sorte](https://google.com/search?btnI=1&q=${args.slice().toString().trim().replace(/,/g,"+")}&safe=active)**
    \n**[Imagem](https://google.com/search?tbm=isch&q=${args.slice().toString().trim().replace(/,/g,"+")}&safe=active)**`)
        .setThumbnail(`https://media2.giphy.com/media/Xy7KEYolrqfgZswu3X/giphy.gif`)
    ;
        if(message.channel.type !== 'dm'){
            embed.setColor(message.guild.me.displayColor);
        }
        enviaMensagem(message, embed);
    }
}