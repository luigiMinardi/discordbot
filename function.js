//funcoes
const Discord = require("discord.js");

const checaPermissao = (message, command) => {
  if(command.category == "moderação"){
    var permissao = [];
    permissao.push(command.permission);
    if (message.member.hasPermission('ADMINISTRATOR')) return true;
    else if (message.member.permissions.has(command.permission) && permissao[0] != undefined) return true;
    else {
      return (
        message.reply(descricaoEmbed(message, `Você precisa ser ADM ou ter as permissões do comando.
        Permissões necessárias para usar comando:
        \`\`${permissao[0] == undefined ? 'ADMINISTRATOR' : command.permission}\`\`.`)),
        false
      );
    }
  }
  if(command.category == "bot-owner"){
    const owners = ["310610499953885184", "651116011021402113"];
    for (let i = 0; i < owners.length; i++) {
      if(message.member.id === owners[i]){
        return (
          enviaMensagem(message, `Olá mestre ${message.author.username}!`),
          true);
      }
    }
      return (
        message.reply(descricaoEmbed(message, "Esse comando só pode ser usado pelo dono do bot.")),
        false); 
  }
}
exports.checaPermissao = checaPermissao;

const embed = (message) =>{
    const criaEmbed = new Discord.MessageEmbed();
    if(message.channel.type !== 'dm'){
        criaEmbed
            .setColor(message.guild.me.displayColor)
            .setFooter(message.author.username, message.author.avatarURL());
    }
    return criaEmbed;
}

const enviaMensagem = (message, mensagem) =>{
    return message.channel.send(mensagem);
}
exports.enviaMensagem = enviaMensagem;

const embedCustom = (message,titulo,mensagem,cor,link) =>{
    return message.channel.send({embed: {
        color: cor,
        title: titulo,
        image:{
            url: link,
        },
        description: mensagem,
    }});
    } 
exports.embedCustom = embedCustom;

const descricaoEmbed = (message,descricao) =>{
    return embed(message).setDescription(descricao);
}
exports.descricaoEmbed = descricaoEmbed;

const corEmbed = (message, cor) =>{
    return embed(message).setColor(cor);
}
exports.corEmbed = corEmbed;

const tituloEmbed =(message,titulo) =>{
    return embed(message).setTitle(titulo);
}
exports.tituloEmbed = tituloEmbed;

const thumbEmbed = (message, thumb) => {
    return embed(message).setThumbnail(thumb);
}
exports.thumbEmbed = thumbEmbed;

const validaCargo =(message,args) =>{
    corEmbed("#fced0b");
    var cargo = args[0];
    var mencaoCargo = new RegExp(/&/);
    var id = new RegExp(/[0-9]{18}/);
    /*console em caso de bug
    console.log("cargo = " + cargo);
    console.log("Teste Cargo= "+ mencaoCargo.test(cargo));*/

    if (mencaoCargo.test(cargo)){
        cargo = cargo.slice(3,-1);
        /*console em caso de bug
        console.log("if aparece");
        console.log("(IF)cargo: "+ cargo);*/
        cargo;
    }else if(!id.test(cargo)){
        cargo = message.guild.roles.cache.find(r => r.name === cargo);
        if(!cargo) return enviaMensagem(descricaoEmbed(`Cargo não encontrado, confere se você criou ele ou se esqueceu!`));
        /*console em caso de bug
        console.log("elif aparece");
        console.log("(elif)cargo: "+ cargo);*/
        cargo;
    }else if(cargo.length == 18 && id.test(cargo)){
        /*console em caso de bug
        console.log("segundo elif");
        console.log("(segundo elif) cargo: "+ cargo);*/
        cargo;
    }else{enviaMensagem(descricaoEmbed("Esse cargo não existe, da uma conferida se você não colocou o usuario no lugar do cargo ou esqueceu de criar o cargo que está tentado dar!"));
}
return cargo;
}
exports.validaCargo = validaCargo;

const achaCargo =(message, prefix, cargo) =>{
    let cargoNome = message.member.roles.cache
    .some(role => role.name === "" + cargo)
    if(cargoNome == true) {
       return enviaMensagem(message, descricaoEmbed(message,`Acabei de checar aqui ${message.member} e você tem o cargo: **${cargo}**!
Meus parabens! Para checar mais cargos tente o comando:\n **${prefix}rserver**`));

    }else{
       return enviaMensagem(message, descricaoEmbed(message,`Eu chequei aqui ${message.member}, e parece que você não tem o cargo: **${cargo}**.
Favor conferir como conseguir esse cargo digitando:\n **${prefix}lsar**`));
    }
}
exports.achaCargo = achaCargo;
