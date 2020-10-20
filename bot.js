//cria o file sistem
const fs = require('fs');
//chama api do discord
const Discord = require("discord.js");
//chama o config.json (onde fica o prefixo, o token e outras informações do seu bot)
const {prefix, token} = require("./config.json");
//cria o bot
const client = new Discord.Client();
//chama a pasta de comandos
client.commands = new Discord.Collection();
// .readdirSync() retorna um array com todos os arquivos da pasta commands,
// .filter() filtra pelos que terminam [.endsWith()] com .js
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
//para cada arquivo(file) dentro da pasta de comandos (commandFiles)
for (const file of commandFiles){
    //cria a constante command que pega o arquivo do comando
    const command = require(`./commands/${file}`);
    //cria um novo item na coleção (client.commands),
    //com o nome do comando e o comando
    client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

const {enviaMensagem, descricaoEmbed, checaPermissao, permArgs} = require('./function');
//quando o bot for ligado
client.once("ready", () =>{
    console.log(`${client.user.username} foi iniciado, com ${client.users.cache.size} usuarios, em ${client.guilds.cache.size} servidores!`);
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(`+help | Upando os comandos!`, {type: 'PLAYING'});
});
//quando o bot entra numa guild (servidor do discord)
client.on("guildCreate", guild => {
    console.log(`O bot entrou no servidor ${guild.name} (id: ${guild.id}). População: ${guild.memberCount} membros!`);
    console.log(`Estou em ${client.guilds.cache.size} servidores!`);
}); 
//quando o bot sai duma guild
client.on("guildDelete", guild => {
    console.log(`O bot foi removido do servidor: ${guild.name} (id: ${guild.id}).`);
    console.log(`Estou em ${client.guilds.cache.size} servidores!`);
});

//quando o bot le uma mensagem (o bot está sempre lendo tudo pra que quando voce o chama ele responda)
client.on('message', message => {
    //se a mensagem nao começar com o prefixo, se for escrita por um bot ou se for mandada no dm, return.
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    // o /g significa "global" ou seja, vai splitar tudo antes do /g (acho que é isso)
    // se precisar conferir aqui: https://stackoverflow.com/questions/6052616/what-does-the-regular-expression-g-mean
    //"const" cria a variavel args que vai pegar a o conteudo da mensagem (message.content), 
    //o .slice() vai remover o prefixo,
    //o .trim() vai tirar os espaços em branco tipo "oi    eu   sou" pra "oi eu sou",
    //separar tudo em um array
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    //pega o primero argumento do array e o retorna, alem de remove-lo do array,
    //(pra nao ter a string com o nome do comando dentro do array com os argumentos do mesmo)
    //coloca em letra minuscula
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    
    if(!command) return;

    //*em construção://
    //message.member.permissions.has('')

    const permissao = command.permission;
    exports.permissao = permissao;
    //teste acima*/

    if(command.Perm_Args){
    if(permArgs(message, command, args) == false) return;
    }
    if (command.permission && !command.Perm_Args){
    if (checaPermissao(message, command) == false) return;
    }

    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply("Eu não posso executar esse comando no DM!");
    }

    if(!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)){
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime){
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`Por favor espere ${timeLeft.toFixed(1)} segundo(s) para poder usar o comando \`${command.name}\` novamente.`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    if (command.args && !args.length) {
        let reply = `_**Você não passou nenhum argumento!**_`;

        if(command.usage){
            reply += `\n **A forma correta seria:**\n\`\`${prefix}${command.name} ${command.usage}\`\``;
        }
        enviaMensagem(message, `Ei, ${message.author}!`);
        return enviaMensagem(message,descricaoEmbed(message, reply));
    }
    
    try {
        command.execute(message, args);
    }catch (error){
        console.error(error);
        message.reply("Deu um erro ao tentar executar esse comando!");
    }
    const embed = new Discord.MessageEmbed().setDescription

    //comandos 

    const comando = 1;

    //true start

    if(comando === "rserver"){
        let arrayNomes = [];
        let arrayIds = [];
        let findNomes = message.guild.roles.cache
        .forEach(role => role.name  === arrayNomes.push(`\n|Nome: `+ role.name +` \\/ `));
        let findIds = message.guild.roles.cache
        .forEach(role => role.id === arrayIds.push(`\n|Id: `+ role.id + ` /\\ \n - - - - - - - - - - - - -`));
        var arrayIndex = [];
        let findIndex = arrayNomes.forEach(function(nome,index){
            return arrayIndex.push(`\n|Index: ` + index + ` <>`);
        })
        var nomesEIds = [];
        var x = 20;
        for (let i = 0; i < arrayIds.length; i++) {
            nomesEIds[i] = arrayIndex[i] + " " + arrayNomes[i] + " " + arrayIds[i];
            if(arrayIndex[i] == `\n|Index: ` + x + ` <>`){
                let stringNomesEIds = nomesEIds.toString();
                enviaMensagem(`\`` +`\``+ `\`coq` + `\n` + `${stringNomesEIds.replace(/,/g,"")}`+ `\`` +`\``+ `\``);
                i = x;
                x+= 20;
                if (arrayIds.length == nomesEIds.length){
                    return;
                }
                nomesEIds = [];
            }
        }
        if(nomesEIds.length <= x){
            let stringNomesEIds = nomesEIds.toString();
            enviaMensagem(`\`` +`\``+ `\`coq` + `\n` + `${stringNomesEIds.replace(/,/g,"")}`+ `\`` +`\``+ `\``);
        }
    }
    

    if (comando === "srole"){
        let arrayNomes = [];
        let arrayIds = [];
        let findNomes = message.guild.roles.cache
        .forEach(role => role.name  === arrayNomes.push(`\nNome: `+ role.name));
        let findIds = message.guild.roles.cache
        .forEach(role => role.id === arrayIds.push(`\nId: `+ role.id));
        var arrayIndex = [];
        let findIndex = arrayNomes.forEach(function(nome,index){
            return arrayIndex.push(`\nIndex: ` + index);
        })
        console.log(`Roles: ` + arrayNomes.length);
        var nomesEIds = [];
        var x = 20;
        for (let i = 0; i < arrayIds.length; i++) {
            nomesEIds[i] = arrayIndex[i] + " " + arrayNomes[i] + " " + arrayIds[i];
            console.log(i);          
            if(arrayIndex[i] == `\nIndex: ` + x){
                enviaMensagem(descricaoEmbed(nomesEIds));
                console.log("i= " + i);
                console.log("x= " + x);
                console.log("Len: " + nomesEIds.length);
                console.log("ArrayIdLen: " + arrayIds.length);
                i = x;
                x+= 20;
                if (arrayIds.length == nomesEIds.length){
                    console.log("F-Len: " + nomesEIds.length);
                    console.log("F-ArrayIdLen: " + arrayIds.length);
                    return console.log("fim do for");
                }
                nomesEIds = [];
            }
        }
        if(nomesEIds.length <=  x){
            console.log("F2-Len: " + nomesEIds.length);
            console.log("F2-x: " + x);
            console.log("F2-ArrayIdLen: " + arrayIds.length);
            enviaMensagem(descricaoEmbed(nomesEIds));
        }
        console.log(`Tamanho da var:` + nomesEIds.length);  
    }
    //nico help
    if (comando === "nrole"){
        let arrayNomes = [];
        let arrayIds = [];
        let findNomes = message.guild.roles.cache
        .forEach(role => role.name  === arrayNomes.push(`\nNome: `+ role.name));
        let findIds = message.guild.roles.cache
        .forEach(role => role.id === arrayIds.push(`\nId: `+ role.id));
        var arrayIndex = [];
        let findIndex = arrayNomes.forEach(function(nome,index){
            return arrayIndex.push(`\n|Index: ` + index);
        })
        console.log(`Roles: ` + arrayNomes.length);
        var nomesEIds = [];
        for (let i = 1; i < arrayIds.length; i++) {
            nomesEIds[i] = arrayIndex[i] + " " + arrayNomes[i] + " " + arrayIds[i];
            enviaMensagem(descricaoEmbed(nomesEIds[i]));
            console.log(i);
        }
        console.log(`Tamanho da var:` + nomesEIds.length);  
    }
    //fim nico
    //skiddie fail
    if (comando === "skd"){
        let arrayNomes = [];
        message.guild.roles.cache.forEach(role => {
            arrayNomes.push({ 
               nome: role.name,
               id: role.id
            })
          });
          enviaMensagemEmbed(arrayNomes);
    }
    //fim skiddie
    
    if (comando === "setrole"){
        message.delete()
        if(!args.length){
            return enviaMensagem(
descricaoEmbed(`Digite o nome ou ID de um cargo e marque os usuarios que queira que receba esse cargo.`));
        }
        let mentionedUser = message.mentions.members.array();
        if(!mentionedUser.length){
            enviaMensagem(descricaoEmbed("Você precisa mencionar alguém pro comando funcionar!"));
        }else if(args.length <= 1){
            return enviaMensagem(descricaoEmbed("Você esqueceu de colocar a role que quer remover!"));
        }
        var role = validaCargo();
        var usuarioNoCargo = new RegExp(/!/);
        var id = new RegExp(/[0-9]{18}/);
        if (typeof role.then === 'function') {
            return role.toString();
        }else if(usuarioNoCargo.test(role)){
            return role.toString();
        }else if(id.test(role)) {
            testaId = message.guild.roles.cache.find(r => r.id == role);
            if(!testaId){
                return enviaMensagem(descricaoEmbed("O ID desse cargo não existe, confere se você não errou o ID!"));
            }
        } 
        for (let i = 0; i < mentionedUser.length; i++) {
            const usuario = mentionedUser[i];
            const temARole = usuario.roles.cache.find(r => r.id == role);
            if(temARole) {
                corEmbed(message.guild.me.displayColor);
enviaMensagem(descricaoEmbed(`O usuario ${usuario} já tem o cargo ${message.guild.roles.resolve(role)}, pq ta tentando pegar ele?`));
            }else{
            usuario.roles.add(role);
            corEmbed("#41FA0A");
            enviaMensagem(descricaoEmbed(`O usuario ${usuario} recebeu o cargo ${message.guild.roles.resolve(role)}!`));
            }
        }
    }
    if (comando === "removerole"){
        message.delete()
        if(!args.length) return enviaMensagem(
descricaoEmbed(`Está faltando argumentos no comando, por favor coloque o nome/ID do cargo e depois marque os usuarios que voce quer remover o cargo.`));
        let mentionedUser = message.mentions.members.array();
        if (!mentionedUser.length) {
            return enviaMensagem(descricaoEmbed("Você não marcou ninguem! marque algum usuario para o comando funcionar."));
        }else if(args.length <= 1){
            return enviaMensagem(descricaoEmbed("Você esqueceu de colocar a role que quer remover!"));
        }
        var role = validaCargo();
        //console em caso de bug
        console.log("Cargo validado: "+ role);
        console.log(role.toString())
        console.log(role);
        var usuarioNoCargo = new RegExp(/!/);
        var id = new RegExp(/[0-9]{18}/);
        if (typeof role.then === 'function') {
            //console em caso de bug
            console.log("É um Promise!");
            console.log("role if: "+role);
            return role.toString();
        }else if(usuarioNoCargo.test(role)){
            console.log("É um Usuario!");
            console.log("role else 1: "+role);
            return role.toString();
        }else if(id.test(role)) {
            testaId = message.guild.roles.cache.find(r => r.id == role);
            console.log("else testaID");
            console.log("role else 2: "+role);
            console.log(role.length);
            console.log(testaId);
            if(!testaId){
                return enviaMensagem(descricaoEmbed("O ID desse cargo não existe, confere se você não errou o ID!"));
            }
        }
        console.log("posif");
        //para cada usuario remova o cargo se o usuario tiver o cargo.
        for (let i = 0; i < mentionedUser.length; i++) {
            const usuario = mentionedUser[i];
            //console em caso de bug
            console.log("Usuario: "+ usuario);
            console.log("Valida cargo: "+ role.toString());
            console.log("Cargo é: "+ role);
            const temARole = usuario.roles.cache.find(r => r.id == role);
            if(temARole) {
                usuario.roles.remove(role);
                corEmbed("#f80c0c");
enviaMensagem(descricaoEmbed(`O cargo ${message.guild.roles.resolve(role)} foi removido do usuario ${usuario}.`));
            }else{
            corEmbed(message.guild.me.displayColor);
enviaMensagem(descricaoEmbed(`O usuario ${usuario} nem tem o cargo ${message.guild.roles.resolve(role)}, pq ta tentando remover?`));
            }
        }
    }
    if (comando === "embedet"){
        function update(msgId, cor, titulo, descricao, image, thumbnail = "http://www.blankwebsite.com/" ){
            descricaoEmbed(descricao);
            corEmbed(cor);
            tituloEmbed(titulo);
            imageEmbed(image);
            thumbEmbed(thumbnail);
        message.channel.messages.fetch({around: msgId, limit: 1})
                .then(msg => {
                    const fetchedMsg = msg.first();
                    fetchedMsg.edit(embed);
                });
        }
        const id = args[0];
        const cor = args[1];
        let virgula = args.indexOf(",");
        let treco = args.indexOf("¬");
        let troco = args.indexOf("ı");
        console.log(args);
        console.log(virgula);
        const titulo = args.slice(2,virgula).toString().trim().replace(/,/g," ");
        console.log("titulo: "+titulo);
        let descricao = args.slice(virgula, treco).toString().trim().replace(/,/g," ");
        console.log("descricao: "+descricao);
        let imagem = args.slice(treco + 1, troco).toString();
        console.log("imagem: " +imagem);
        let thumb = args.slice(troco + 1).toString();
        console.log("thumb: " +thumb);
        function validaURL(string) {
            var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
            console.log("fun res: "+res);
            return (res !== null);
          };
        console.log("teste= "+ validaURL(imagem));
        if(!imagem) {
            console.log("image ifado");
            imagem = "http://www.blankwebsite.com/";
        }else if(!validaURL(imagem)){
            console.log("image elifado");
            imagem = "http://www.blankwebsite.com/";
            descricao += " "+ args.slice(-1).toString();
        } 
        if(!thumb) {
            console.log("thumb ifado")
            thumb = "http://www.blankwebsite.com/";
        }
        console.log("imagem pós if: "+ imagem);
        update(id,cor,titulo,descricao, imagem);
    }
    if (comando === "embede"){
        function update(msgId, cor, titulo, descricao, image = "http://www.blankwebsite.com/", thumbnail = "http://www.blankwebsite.com/"){
            descricaoEmbed(descricao);
            corEmbed(cor);
            tituloEmbed(titulo);
            imageEmbed(image);
            thumbEmbed(thumbnail);
        message.channel.messages.fetch({around: msgId, limit: 1})
                .then(msg => {
                    const fetchedMsg = msg.first();
                    fetchedMsg.edit(embed);
                });
        }
        const id = args[0];
        const cor = args[1];
        let virgula = args.indexOf(",");
        let chamaImagem = args.indexOf("¬");
        let chamaThumb = args.indexOf("ı");
        const titulo = args.slice(2,virgula).toString().trim().replace(/,/g," ");
        let descricao = args.slice(virgula, chamaImagem).toString().trim().replace(/,/g," ");
        let imagem = args.slice(chamaImagem + 1, chamaThumb).toString();
        let thumb = args.slice(chamaThumb + 1).toString();
        
        console.log("chamaThumb: "+ chamaThumb);
        console.log("tumb: "+thumb);
        console.log("chamaImg: "+chamaImagem);
        console.log("img: "+imagem);

        if(chamaThumb == "-1"){
            console.log("if chamatumb");

            thumb = "http://www.blankwebsite.com/";
        }
        if(!thumb) {
            console.log("if tumb");

            thumb = "http://www.blankwebsite.com/";
        }
        if (chamaImagem == "-1"){
            console.log("if chamaimg");

            imagem = "http://www.blankwebsite.com/"; 
        }
        if(!imagem) {
            console.log("if img");
            imagem = "http://www.blankwebsite.com/";
        }
        
        update(id,cor,titulo,descricao, imagem, thumb);
    }
    if (comando === "y"){
        enviaMensagem(descricaoEmbed("Comando off pra corrigir safe search, tempo indefinido pra voltar"));
        //enviaMensagem(descricaoEmbed(`https://youtube.com/search?q=${args.slice().toString().trim().replace(/,/g,"+")}`))
    }

});
"http://www.blankwebsite.com/"
//login do bot
client.login(token);

/*
  /
if(message.member.roles.cache.has("703839794127700038")) {
    console.log(`Yay, the author of the message has the role!`);
  } else {
    console.log(`Nope, noppers, nadda.`);
  }

let myRole = message.guild.roles.find(role => role.name === "Moderators");

// Check if they have one of many roles
if(message.member.roles.some(r=>["Dev", "Mod", "Server Staff", "Proficient"].includes(r.name)) ) {
    // has one of the roles
  } else {
    // has none of the roles
  }

  let roleID = "264410914592129025";
  let membersWithRole = message.guild.roles.get(roleID).members;
  console.log(`Got ${membersWithRole.size} members with that role.`);
*/