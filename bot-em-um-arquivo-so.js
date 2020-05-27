//cria o file sistem
const fs = require('fs');
//chama api do discord
const Discord = require("discord.js");
//cria o bot
const client = new Discord.Client();
//que chama o config.json (onde fica o prefixo, o token e outras informações do seu bot)
const config = require("./config.json");
//chama a pasta de comandos
client.commands = new Discord.Collection();
// .readdirSync() retorna um array com todos os arquivos da pasta commands,
// .filter() filtra pelos que terminam [.endsWith()] com .js
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//quando o bot for ligado
client.on("ready", () =>{
    //console.log(`Bot foi iniciado, com ${client.user.cache.size} usuarios, em ${client.channels.cache.size} canais, em ${client.guilds.cache.size} servidores!`);
    //client.user.setActivity(`Eu estou em ${client.guilds.cache.size} servidores!`);
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(`pai ta on!`, {type:'LISTENING'});
});
//quando o bot entra numa guild (servidor do discord)
client.on("guildCreate", guild => {
    console.log(`O bot entrou no servidor ${guild.name} (id: ${guild.id}). População: ${guild.memberCount} membros!`);
    //client.user.setActivity(`Estou em ${client.guilds.cache.size} servidores!`);
});
//quando o bot sai duma guild
client.on("guildDelete", guild => {
    console.log(`O bot foi removido do servidor: ${guild.name} (id: ${guild.id}).`);
    //client.user.setActivity(`Estou em ${client.guilds.cache.size} servidores!`);
});

//quando o bot le uma mensagem (o bot está sempre lendo tudo pra que quando voce o chama ele responda)
client.on("message", async message => {
    //se a mensagem nao começar com o prefixo, se for escrita por um bot ou se for mandada no dm, return.
    if(!message.content.startsWith(config.prefix) || message.author.bot || message.channel.type === "dm") return;

    // o /g significa "global" ou seja, vai splitar tudo antes do /g (acho que é isso)
    // se precisar conferir aqui: https://stackoverflow.com/questions/6052616/what-does-the-regular-expression-g-mean
    //"const" cria a variavel args que vai pegar a o conteudo da mensagem (message.content), 
    //o .slice() vai remover o prefixo,
    //o .trim() vai tirar os espaços em branco tipo "oi    eu   sou" pra "oi eu sou",
    //separar tudo em um array
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    //pega o primero argumento do array e o retorna, alem de remove-lo do array,
    //(pra nao ter a string com o nome do comando dentro do array com os argumentos do mesmo)
    //coloca em letra minuscula
    const comando =  args.shift().toLowerCase();


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
    function validaCargo(){
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

    //comandos
    if(comando === "ping"){
        const m = await enviaMensagem(descricaoEmbed("Ping?"));
        m.edit(descricaoEmbed(`Pong! A latência é ${m.createdTimestamp - message.createdTimestamp}ms.
A latencia da API é ${Math.round(client.ws.ping)}ms.`));
    }

    if(comando === "args-info"){
        if(!args.length){
            return message.channel.send(`Você não passou nenhum argumento, ${message.author}!`);
        } else if(args[0] === 'batata'){
            return message.channel.send("Não, batata eu não aceito, coloca outro argumento ai!");
        }
        message.channel.send(`Nome do comando: ${comando}\nArguments: ${args}
Comprimento (length) dos argumentos: ${args.length}`);
    }
    if(comando === "testaisso"){
        return enviaMensagem(message.guild.me.displayColor);
    }
    if(comando === "mostra"){
        if (!args.length){
            tituloEmbed(`O que você quer mostrar?`)
            return enviaMensagem(descricaoEmbed(`
            -Para mostrar o icone da guild use:
            **+mostra guild**

            -Para mostrar o seu proprio avatar use:
            **+mostra meu-avatar**

            -Para mostrar o avatar de outros usuarios use:
            **+mostra avatar @**
            Por exeplo: **+mostra avatar ${message.guild.me}**
            (Para mostrar meu lindo avatar!)
            
            -Para mostrar avatares de varios usuarios de uma vez use:
            **+mostra avatar array @'s**
            Por exeplo: **+mostra avatar array ${message.guild.me} ${message.author}**
            (Para mostrar nossos lindos avatares!)`));
        }
        if (args == "guild") {
            let mostraAvatar = message.guild.iconURL();
            imageEmbed(mostraAvatar+"?size=256");
            enviaMensagem(descricaoEmbed(`[Image Link](${mostraAvatar}?size=256)`));
        }
        if (args == "meu-avatar") {
            let mostraAvatar = message.author.displayAvatarURL();
            embedCustom("Seu avatar é esse:",`[Image Link](${mostraAvatar}?size=256)`,
            message.guild.me.displayColor,mostraAvatar+"?size=256");
        }
        if (args[0] == "avatar"){
            if(message.mentions.users.size == 0){
                tituloEmbed(`Você precisa marcar alguém pro comando funcionar :)`)
                return enviaMensagem(descricaoEmbed(`Por exeplo: **+mostra avatar ${message.guild.me}**
                (Para mostrar meu lindo avatar!)

                Ou então você pode pedir varios avatares de uma vez usando o **avatar array**
                Por exeplo: **+mostra avatar array ${message.guild.me} ${message.author}**
                (Para mostrar nossos lindos avatares ao mesmo tempo!)`));
            }else if(args[1] == "array"){
                let mentionedUser = message.mentions.users.array();
                for (let i = 0; i < mentionedUser.length; i++) {
                    let enviaAvatar = mentionedUser[i].displayAvatarURL();
                    imageEmbed(enviaAvatar+"?size=256")
                    enviaMensagem(descricaoEmbed(`[Image Link](${enviaAvatar}?size=256)`));  
                    console.log("Envia avatar = " + enviaAvatar);         
                }
                console.log("Mostra avatares = "+ mentionedUser);
                console.log("Users size = " + message.mentions.users.size);
                console.log("Avatares length = " +mentionedUser.length);
            } else {
                let mostraAvatar = message.mentions.users.first().displayAvatarURL();
                imageEmbed(mostraAvatar+"?size=256");
                enviaMensagem(descricaoEmbed(`[Image Link](${mostraAvatar}?size=256)`));
            }
        }
    }
    if(comando === "role"){

        function achaCargo(cargo){
            let cargoNome = message.member.roles.cache
            .some(role => role.name === "" + cargo)
            if(cargoNome == true) {
                return enviaMensagem(descricaoEmbed(`Acabei de checar aqui ${message.member} e você tem o cargo: **${cargo}**!
Meus parabens! Para checar mais cargos tente o comando:\n **${config.prefix}rserver**`));

            }else{
                return enviaMensagem(descricaoEmbed(`Eu chequei aqui ${message.member}, e parece que você não tem o cargo: **${cargo}**.
Favor conferir como conseguir esse cargo digitando:\n **${config.prefix}lsar**`));
            }
        }
        if(!args.length){
            enviaMensagem(descricaoEmbed("Coloque o nome de algum cargo!"));
        }else {
            achaCargo(args);
        }
    }

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
    if (comando === "embedsr"){
        corEmbed(message.mentions.roles.first().color);
        enviaMensagem(descricaoEmbed(`${args.slice().toString().trim().replace(/,/g," ")}`));
    }
    if (comando === "embedc"){
        const hex = /[0-9A-Fa-f]{6}/g;
        if(!hex.test(args[0])){
            corEmbed("#FFFF62");
            enviaMensagem(descricaoEmbed(`Coloque uma **cor hexadecimal** valida:
            
            Tente [pegar um hexadecimal aqui](https://htmlcolorcodes.com/).

            Ou [converta um RGB/RGBA pra Hexadecimal aqui](https://cssgenerator.org/rgba-and-hex-color-generator.html).
            
            Não sabe o que é uma cor hexadecimal?
            [confira o que é uma cor hexadecimal aqui](https://medium.com/origamid/cores-em-hexadecimal-memor%C3%A1veis-cc939511753c).
            `));
        } else {
            corEmbed(args[0]);
            enviaMensagem(descricaoEmbed(`${args.slice(1).toString().trim().replace(/,/g," ")}`));
        }
    }
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
    if (comando === "jump"){
        enviaMensagem(descricaoEmbed(`[${args.slice(2).toString().trim().replace(/,/g," ")}](https://discordapp.com/channels/${message.guild.id}/${args[0]}/${args[1]})`));
        /*console.log("guild id: "+message.guild.id);
        console.log("channel id: "+message.channel.id);
        console.log("id da msg: "+message.id);
        console.log("id author:"+ message.author.id);*/
    }
    if (comando === "jumpsv"){
        enviaMensagem(descricaoEmbed(`[${args.slice(3).toString().trim().replace(/,/g," ")}](https://discordapp.com/channels/${args[0]}/${args[1]}/${args[2]})`));
    }
    if (comando === "p"){
        enviaMensagem(descricaoEmbed(`https://google.com/search?q=${args.slice().toString().trim().replace(/,/g,"+")}&safe=active`))
    }
    if (comando === "y"){
        enviaMensagem(descricaoEmbed("Comando off pra corrigir safe search, tempo indefinido pra voltar"));
        //enviaMensagem(descricaoEmbed(`https://youtube.com/search?q=${args.slice().toString().trim().replace(/,/g,"+")}`))
    }
});

//login do bot
client.login(config.token);

