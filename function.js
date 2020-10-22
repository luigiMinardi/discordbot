//funcoes
const Discord = require("discord.js");

const checaOwner = (message, command) =>{
  const owners = ["310610499953885184", "651116011021402113"];
  //const owners = ["310610499953885184"];

  for (let i = 0; i < owners.length; i++) {
    if(message.author.id === owners[i]){
      /*
      if(command.category === "bot-owner"){
        message.author.send(`Olá mestre ${message.author.username}!`);
        if(message.channel.type !== 'dm'){
          message.author.send(embed(message).setDescription(`**[Voltar para o servidor de origem](${message.url})**`));
        }
      }
      //*/
    return true;
    }
  }
}

const permArgs = (message, command, args) => {
  let permissao = [];
  let argumentosDeComandoQueUsamPermissao = command.Perm_Args;
  permissao.push(command.permission);
  /*
  console.log(`tem ${command.permission[0]}: `+message.member.permissions.has(command.permission[0]));
  console.log(`tem ${command.permission[1]}: `+message.member.permissions.has(command.permission[1]));
  console.log("Perm_Args: ");
  console.log(command.Perm_Args);
  console.log(argumentosDeComandoQueUsamPermissao);
  console.log("permission length: "+command.permission.length);
  console.log("Args: "+ args);
  //*/
  if (checaOwner(message, command) == true) return true;
  if (message.member.hasPermission('ADMINISTRATOR')) return true;
  for (let i = 0; i < argumentosDeComandoQueUsamPermissao.length; i++) {
    /*
    console.log("Args some: ");
    console.log(args.some(arg => arg == argumentosDeComandoQueUsamPermissao[i]) == true);
    //*/
    if (args.some(arg => arg == argumentosDeComandoQueUsamPermissao[i]) == true){
      i = argumentosDeComandoQueUsamPermissao.length;
      var checkAllPermission = [];
  
      for (let index = 0; index < command.permission.length; index++) {
        //console.log(`tem ${command.permission[index]}: `+message.member.permissions.has(command.permission[index]));
  
        if (message.member.permissions.has(command.permission[index])){
          
            checkAllPermission.push(true);
            if(permissao[0] != undefined) return true;
        }else checkAllPermission.push(false);
      }
      //console.log("checkAllPermission: "+checkAllPermission);
  
      if(!checkAllPermission.some(perm => perm == true)) {
        if (command.category !== 'bot-owner'){
  
          return (
            message.reply(descricaoEmbed(message, `Você precisa ser ADM ou ter uma das permissões do comando.
            Permissões necessárias para usar o comando:
            \`\`${permissao[0] == undefined ? 'ADMINISTRATOR' : command.permission.toString().replace(/,/g,", ")}\`\`.`)),
            false
          );
        }
      }
    }
  }
  if (!args.length || args !== command.Perm_Args) return true;

}
exports.permArgs = permArgs;

const checaPermissao = (message, command) => {
  if(command.category === "moderação"){
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
  if(command.category === "bot-owner"){
    if (checaOwner(message, command) == true) return true;
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
