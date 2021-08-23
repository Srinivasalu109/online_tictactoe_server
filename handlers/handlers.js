var rooms = []
function createRoom({ room, id }) {
    console.log(room)
    var isExist = rooms.filter(player => player.roomName === room)
    if (isExist.length === 0) {
        rooms.push({ roomName: room, Id: id })
        return true
    }
    else {
        return false
    }
}
function joinRoom({ room, id }) {
    console.log(rooms)
    if (rooms.length === 0) {
        return { flag1: false }
    }
    else {
        var len = rooms.filter(user => user.roomName === room)
        if (len.length === 0) {
            return { flag2: false }
        }
        if (len.length === 1) {
            rooms.push({ roomName: room, Id: id })
            return ({ player1ID1: len[0].Id, player2ID1: id, flag3: true })
        }
        else {
            return { player1ID2: len[0].Id, player2ID2: id, flag4: false }
        }
    }
}
function removeRoom(myId) {
    var leftId;
    console.log("here")
    console.log(myId)
    console.log(rooms)
    var getRoom1 = rooms.filter(room => room.Id === myId)
    const getOpp = rooms.filter(rm => getRoom1[0].roomName === rm.roomName)
    if (getOpp.length === 2) {
        if (getOpp[0].Id === myId) {
            leftId = getOpp[1].Id
        }
        else {
            leftId = getOpp[0].Id
        }
    }
    rooms = rooms.filter(rm => rm.roomName !== getRoom1[0].roomName)
    return leftId
}
module.exports = { createRoom, joinRoom, removeRoom }