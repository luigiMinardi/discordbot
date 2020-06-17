const {achaCargo} = require('../function');
const {prefix} = require('../config.json');
module.exports = {
    name: 'role',
    description: 'Verifica se você tem um cargo.',
    usage: '<nome do cargo>',
    category: 'utilidade',
    args: true,
    guildOnly: true,
    execute(message, args){
            achaCargo(message, prefix, args);
    }
}