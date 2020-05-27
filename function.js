//funcoes

const embed = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayColor)
        .setDescription('')
        .setImage('') 
        .setTitle('')
        .setThumbnail('')
        .setAuthor('')
        .setFooter('');

function enviaMensagem(mensagem){
    console.log("Envia mensagem foi usado");
    return message.channel.send(mensagem);
}

function embedCustom(titulo,mensagem,cor,link){
    return message.channel.send({embed: {
        color: cor,
        title: titulo,
        image:{
            url: link,
        },
        description: mensagem
    }});
    } 
function descricaoEmbed(descricao){
    return embed.setDescription(descricao);
}
function imageEmbed(image){
    return embed.setImage(image);
}
function corEmbed(cor){
    return embed.setColor(cor);
}
function tituloEmbed(titulo){
    return embed.setTitle(titulo);
}
function thumbEmbed(thumb){
    return embed.setThumbnail(thumb);
}
