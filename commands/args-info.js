
module.exports = {
    name: 'args-info',
    description: 'Mostra os Argumentos',
    usage: '<coloca qualquer coisa> (menos "batata", sério, não coloca "batata"...)',
    args: true,
    execute(message, args){
        if(args[0] === 'batata'){
            return message.channel.send("Não, batata eu não aceito, coloca outro argumento ai!");
        }
        message.channel.send(`\nArgumentos: ${args}
    Comprimento dos argumentos: ${args.length}`);
    }
}

