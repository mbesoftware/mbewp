function successfullMessage(msg) {
    return "✅ *MbeWp*:  ```" + msg + "```"
}
function errorMessage(msg) {
    return "🛑 *MbeWp*:  ```" + msg + "```"
}
function infoMessage(msg) {
    return "⏺️ *MbeWp*:  ```" + msg + "```"
}


module.exports = {
    successfullMessage,
    errorMessage,
    infoMessage
}
