const {enviaMensagem, descricaoEmbed} = require('../function');
module.exports = {
    name: 'ping',
    description: 'Mostra seu ping!',
    aliases: ['ms'],
    category: 'utilidade',
    cooldown: 5,
    async execute(message, args){
        const m = await enviaMensagem(message,descricaoEmbed(message,"Ping?"));
        m.edit(descricaoEmbed(message,`:ping_pong: Pong! A latência é ${m.createdTimestamp - message.createdTimestamp}ms.
A latencia da API é ${Math.round(message.client.ws.ping)}ms.`));
    }
};