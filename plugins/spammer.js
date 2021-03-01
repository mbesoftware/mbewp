const mbe = require('../events');
const Language = require('../language');
const Lang = Language.getString('spammer');

let totalMaxSpamCount = 50


mbe.addCommand({ pattern: 'spam ?(.*)', fromMe: true, desc: Lang.SPAM_DESC }, (async (message, match) => {

    if (match[1] === '') {
        return await message.client.sendMessage(message.jid,Lang.NEED_WORD, MessageType.text);
    }


    if (totalMaxSpamCount !== 0) {
        for (let index = 0; index < totalMaxSpamCount; index++) {
            await message.sendMessage(match[1])
        }
    }


}));

mbe.addCommand({ pattern: 'killspam', fromMe: true, desc: Lang.STOP_SPAMDESC }, (async (message, match) => {

    totalMaxSpamCount = 0
    await message.client.sendMessage(message.jid,Lang.STOP_SPAM, MessageType.text);

}));
