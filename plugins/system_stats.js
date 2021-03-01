const mbe = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const {spawnSync} = require('child_process');
const Config = require('../config');
const chalk = require('chalk');

const Language = require('../language');
const Lang = Language.getString('system_stats');

mbe.addCommand({pattern: 'alive', fromMe: true, desc: Lang.ALIVE_DESC}, (async (message, match) => {
    if (Config.ALIVEMSG == 'default') {
        await message.client.sendMessage(message.jid,'```MBE Whatsapp Otonom Kullanıcı Yazılımı Çalışıyor!```\n\n*Version:* ```'+Config.VERSION+'```\n*Branch:* ```'+Config.BRANCH+'```\n*Developer Site: https://github.com/mbesoftware' , MessageType.text);
    }
    else {
        await message.client.sendMessage(message.jid,Config.ALIVEMSG + '\n*Coded by Burak Eyidoğan*', MessageType.text);
    }
}));

mbe.addCommand({pattern: 'sysd', fromMe: true, desc: Lang.SYSD_DESC}, (async (message, match) => {
    const child = spawnSync('neofetch', ['--stdout']).stdout.toString('utf-8')
    await message.sendMessage(
        '```' + child + '```', MessageType.text
    );
}));
