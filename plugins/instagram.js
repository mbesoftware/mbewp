const mbe = require('../events')
const { MessageType } = require('@adiwajshing/baileys')
const axios = require('axios')

const Language = require('../language')
const { errorMessage, infoMessage } = require('../helpers')
const Lang = Language.getString('instagram')

mbe.addCommand({ pattern: 'insta ?(.*)', fromMe: true, usage: Lang.USAGE, desc: Lang.DESC }, async (message, match) => {

    const userName = match[1]

    if (!userName) return await message.sendMessage(errorMessage(Lang.NEED_WORD))

    await message.sendMessage(infoMessage(Lang.LOADING))

    await axios
      .get(`https://www.instagram.com/${userName}/?__a=1`)
      .then(async (response) => {
        const {
          profile_pic_url_hd,
          username,
          biography,
          edge_followed_by,
          edge_follow,
          full_name,
          is_private,
        } = response.data.graphql.user

        const profileBuffer = await axios.get(profile_pic_url_hd, {
          responseType: 'arraybuffer',
        })

        const msg = `
        *${Lang.NAME}*: ${full_name}
        *${Lang.USERNAME}*: ${username}
        *${Lang.BIO}*: ${biography}
        *${Lang.FOLLOWERS}*: ${edge_followed_by.count}
        *${Lang.FOLLOWS}*: ${edge_follow.count}
        *${Lang.ACCOUNT}*: ${is_private ? Lang.HIDDEN : Lang.PUBLIC}`

        await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.image, {
          caption: msg,
        })
      })
      .catch(
        async (err) => await message.sendMessage(errorMessage(Lang.NOT_FOUND + userName)),
      )
  },
)
