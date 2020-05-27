module.exports = {
    name: 'ping',
    description: 'Shows your ping!',
    async execute(message, args){
        //esse usa a função enviaMensagem e descricaoEmbed e não funciona
        const m = await enviaMensagem(descricaoEmbed("Ping?"));
        m.edit(descricaoEmbed(`Pong! A latência é ${m.createdTimestamp - message.createdTimestamp}ms.
A latencia da API é ${Math.round(client.ws.ping)}ms.`));
    }
};
