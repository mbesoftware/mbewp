function successfullMessage(msg) {
    return "β *MbeWp*:  ```" + msg + "```"
}
function errorMessage(msg) {
    return "π *MbeWp*:  ```" + msg + "```"
}
function infoMessage(msg) {
    return "βΊοΈ *MbeWp*:  ```" + msg + "```"
}


module.exports = {
    successfullMessage,
    errorMessage,
    infoMessage
}
