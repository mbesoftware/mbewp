const mbe = require('../events');
const {MessageType,Mimetype} = require('@adiwajshing/baileys');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg'); // For Creating File
const {execFile} = require('child_process');
const cwebp = require('cwebp-bin');
const axios = require('axios'); // Resp Checker
const Config = require('../config'); // GAN STYLE Support

const got = require("got"); // Responses Catcher
const deepai = require('deepai'); // Localde ise deepmain.js oluşturarak özelleştirilebilir şekilde kullanabilirsiniz. Web Sunucularında Çalışmaz!!
deepai.setApiKey('4ec4c7f4-63cd-457f-b244-7e12bba7ebde'); // Quickstart API Key

const Language = require('../language'); 
const Lang = Language.getString('deepai'); // Language Support

mbe.addCommand({pattern: 'deepai', fromMe: true, deleteCommand: false, desc: Lang.DEEPAI_DESC}, (async (message, match) => {

    await message.sendMessage('💻 Usage: *.moodai <text>*\nℹ️ Desc: 🇹🇷 Yazdığınız yazıdan ruh halinizi bulur.\n🇬🇧 It finds your mood from the article you wrote.\n\n💻 Usage: *.colorai*\nℹ️ Desc: 🇹🇷 Siyah beyaz fotoğrafları renklendirir.\n🇬🇧 It colorize bw photos.\n\n💻 Usage: *.superai*\nℹ️ Desc: 🇹🇷 Fotoğrafın kalitesini yapay zeka ile arttırır.\n🇬🇧 Improves the quality of photos with Neural AI.\n\n💻 Usage: *.waifuai*\nℹ️ Desc: 🇹🇷 Fotoğrafların renk paletlerini yapay zeka ile birleştirir.\n🇬🇧 Combines the color palettes of photos with artificial intelligence.\n\n💻 Usage: *.dreamai*\nℹ️ Desc: 🇹🇷 Fotoğrafa deepdream efekti uygular.\n🇬🇧 Applies deepdream effect to the photo.\n\n💻 Usage: *.neuraltalkai*\nℹ️ Desc: 🇹🇷 Fotoğrafki olan şeyi yapay zeka ile açıklar.\n🇬🇧 Explain the phenomenon in the photo with artificial intelligence.\n\n💻 Usage: *.ttiai <text>*\nℹ️ Desc: 🇹🇷 Yazıyı resme dönüştürür.\n🇬🇧 Converts text to a picture. (Text-to-Image)\n\n💻 Usage: *.toonai*\nℹ️ Desc: 🇹🇷 Fotoğraftaki yüzü çizgi film karakterine çevirir.\n🇬🇧 Turns the face in the photo into a cartoon character.\n\n💻 Usage: *.textai <text>*\nℹ️ Desc: 🇹🇷 Yazdığınız cümleden size yapay bir hikaye yaratır.\n🇬🇧 It creates an artificial story for you from your sentence.\n\n💻 Usage: *.nudityai*\nℹ️ Desc: 🇹🇷 Fotoğraftaki NSFW değerini 1 ve 0 arasında gösterir. \n🇬🇧 It shows the NSFW value between 1 and 0 in the photo.\n\n💻 Usage: *.ganstyle*\nℹ️ Desc: 🇹🇷 Yanıtladığınız fotoğrafı seçili olan resim ile birleştirir.\n🇬🇧 Combines the photo you answered with the selected picture.\n\n⚠️ 🇹🇷 *Bütün bu yapay zeka araçlarını derin öğrenme ile çalışır. Ne kadar fazla kullanırsanız o kadar fazla bilgiyi depolar.* ```Sadece ingilizce karakter kullanın!```\n\n⚠️ 🇬🇧 *All the tools here work with deep learning. The more you use it, the more information it stores.* ```Use only english characters!```');

}));

mbe.addCommand({pattern: 'colorai', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
    if (message.reply_message === false) return await message.sendMessage('```Need Photo!```');

    var downloading = await message.client.sendMessage(message.jid,'Colorizing.. 🎨',MessageType.text);
    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });

    ffmpeg(location)
        .save('output.jpg')
        .on('end', async () => {
            var resp = await deepai.callStandardApi("colorizer", {
                image: fs.createReadStream("./output.jpg"),

            });

            var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

            await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'MBE Whatsapp Otonom Kullanıcı Yazılımı Tarafından Oluşturuldu'})

        });

        return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));

mbe.addCommand({pattern: 'waifuai', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
    if (message.reply_message === false) return await message.sendMessage('```Need Photo!```');

    var downloading = await message.client.sendMessage(message.jid,'Mixing.. 🧩',MessageType.text);
    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });

    ffmpeg(location)
        .save('output.jpg')
        .on('end', async () => {
            var resp = await deepai.callStandardApi("waifu2x", {
                image: fs.createReadStream("./output.jpg"),

            });

            var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

            await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'MBE Whatsapp Otonom Kullanıcı Yazılımı Tarafından Oluşturuldu'})

        });

        return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));

mbe.addCommand({pattern: 'superai', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
    if (message.reply_message === false) return await message.sendMessage('```Need Photo!```');

    var downloading = await message.client.sendMessage(message.jid,'Enhancing.. 🖌️',MessageType.text);
    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });

    ffmpeg(location)
        .save('output.jpg')
        .on('end', async () => {
            var resp = await deepai.callStandardApi("torch-srgan", {
                image: fs.createReadStream("./output.jpg"),

            });

            var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

            await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'MBE Whatsapp Otonom Kullanıcı Yazılımı Tarafından Oluşturuldu'})

        });

        return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));

mbe.addCommand({pattern: 'moodai ?(.*)', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {
    if (match[1] === '') return await message.sendMessage(Lang.TEXT);

    var resp = await deepai.callStandardApi("sentiment-analysis", {
        text: `${match[1]}`,

    });

    await message.reply(`*Mood:* ${resp.output}`);

}));

mbe.addCommand({pattern: 'dreamai', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
    if (message.reply_message === false) return await message.sendMessage('```Need Photo!```');

    var downloading = await message.client.sendMessage(message.jid,'Starry Night.. 🌃',MessageType.text);
    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });

    ffmpeg(location)
        .save('output.jpg')
        .on('end', async () => {
            var resp = await deepai.callStandardApi("deepdream", {
                image: fs.createReadStream("./output.jpg"),

            });

            var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

            await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'MBE Whatsapp Otonom Kullanıcı Yazılımı Tarafından Oluşturuldu'})

        });

        return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));

mbe.addCommand({pattern: 'neuraltalkai', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
    if (message.reply_message === false) return await message.sendMessage('```Need Photo!```');

    var downloading = await message.client.sendMessage(message.jid,'Reading.. 🙇🏻',MessageType.text);
    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });

    ffmpeg(location)
        .save('output.jpg')
        .on('end', async () => {
            var resp = await deepai.callStandardApi("neuraltalk", {
                image: fs.createReadStream("./output.jpg"),

            });

            await message.reply(`*Output:* ${resp.output}`);

        });

        return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));

mbe.addCommand({pattern: 'ttiai ?(.*)', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {
    if (match[1] === '') return await message.sendMessage(Lang.TEXT);

    var resp = await deepai.callStandardApi("text2img", {
        text: `${match[1]}`,

    });

    var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'MBE Whatsapp Otonom Kullanıcı Yazılımı Tarafından Oluşturuldu'})

}));

mbe.addCommand({pattern: 'toonai', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
    if (message.reply_message === false) return await message.sendMessage('```Need Photo!```');

    var downloading = await message.client.sendMessage(message.jid,'Tooning.. 🌟',MessageType.text);
    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });

    ffmpeg(location)
        .save('output.jpg')
        .on('end', async () => {
            var resp = await deepai.callStandardApi("toonify", {
                image: fs.createReadStream("./output.jpg"),

            });

            var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

            await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg})

        });

        return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));

mbe.addCommand({pattern: 'nudityai', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
    if (message.reply_message === false) return await message.sendMessage('```Need Photo!```');

    var downloading = await message.client.sendMessage(message.jid,'Finding NSFW.. 🔥',MessageType.text);
    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });

    ffmpeg(location)
        .save('output.jpg')
        .on('end', async () => {
            var resp = await deepai.callStandardApi("content-moderation", {
                image: fs.createReadStream("./output.jpg"),

            });

            await message.reply(`*Output:* ${resp.output.nsfw_score}`);

        });

        return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));

mbe.addCommand({pattern: 'textai ?(.*)', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {
    if (match[1] === '') return await message.sendMessage(Lang.TEXT);

    var resp = await deepai.callStandardApi("text-generator", {
        text: `${match[1]}`,

    });

    await message.reply(`*Article:*\n ${resp.output}`);

}));

mbe.addCommand({pattern: 'ganstyle', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
    if (message.reply_message === false) return await message.sendMessage('```Need Photo!```');

    var downloading = await message.client.sendMessage(message.jid,'Creating.. ♻️',MessageType.text);
    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });

    ffmpeg(location)
        .save('output.jpg')
        .on('end', async () => {
            var resp = await deepai.callStandardApi("CNNMRF", {
                style: Config.GANSTYLE,
                content: fs.createReadStream("./output.jpg"),

            });

            var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

            await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'MBE-WP Tarafından Oluşturuldu'})

        });

        return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));
