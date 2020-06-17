module.exports = {
    name: 'reload',
    description: 'Da Reload em um comando',
    aliases: ['recarrega'],
    usage: "<nome do comando>",
    category: "bot-owner",
    args: true,
    cooldown: 1,
    guildOnly: false,
    permission: ['SEND_MESSAGES'],
    execute(message, args){
        if (!args.length) return message.channel.send(`${message.author}, você não passou nenhum comando pra dar reload!`);
    const commandName = args[0].toLowerCase();
    const command = message.client.commands.get(commandName)
        || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return message.channel.send(`${message.author}, não tem nenhum comando com o nome ou alias igual a \`${commandName}\``);
    delete require.cache[require.resolve(`./${command.name}.js`)];
    try {
        const newCommand = require(`./${command.name}.js`);
        message.client.commands.set(newCommand.name, newCommand);
        message.channel.send(`Você deu reload no comando: \`${command.name}\`!`);
    }catch (error){
        console.log(error);
        message.channel.send(`Ocorreu um erro ao executar o comando \`${command.name}\`: \n\`${error.message}\``);
    }
    }
}