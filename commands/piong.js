module.exports = {
	name: 'piong',
	description: 'Ping!',
	execute(message, args) {
		//esse não usa a função e funciona
		message.channel.send('Pong.');
	},
};