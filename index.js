var express = require('express')
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http, {
  cors: {
    origin: '*',
  }
});
const { createRoom, joinRoom,removeRoom } = require("./handlers/handlers")
// const { v4: uuidv4 } = require('uuid');
const PORT =process.env.PORT||4000
io.on('connection', socket => {
  socket.on("create-room", name => {
    console.log("hi")
    var id1 =socket.id
    var flag = createRoom({ room: name, id: id1 })
    if (flag) {
      socket.join(id1)
      socket.emit("created", id1)
    }
    else {
      socket.emit("not-created")
    }
  })
  socket.on("join-room", room => {
    console.log("here")
    var id2 = socket.id
    var { flag1, flag2, player1ID1, player2ID1, flag3, player1ID2, player2ID2, flag4 } = joinRoom({ room: room, id: id2 })
    console.log(flag1, flag2, player1ID1, player2ID1, flag3, player1ID2, player2ID2, flag4)
    if (flag3) {
      socket.join(id2)
      socket.emit("join", id2)
      io.in(player1ID1).in(player2ID1).emit("start", { id1: player1ID1, id2: player2ID1 });
    }
    else if (flag4) {
      socket.emit("join", id2)
      io.in(player1ID2).in(player2ID2).emit("start", { id1: player1ID2, id2: player2ID2 });
    }
    else{
    socket.emit("not-joined")
    }
  })
  socket.on("change-board", (board, opponentID ,ismyturn) => {
    io.in(opponentID).emit("changed", board,ismyturn)
  })
  socket.on("set-looser",opponentID=>{
    console.log("lose")
    io.in(opponentID).emit("losser")
  })
  socket.on("replay",(player1,player2)=>{
  io.in(player1).in(player2).emit("replay");
  io.in(player1).in(player2).emit("start",{ id1: player1, id2: player2 });
  })
  socket.on("quit",(player1,player2)=>{
    removeRoom(player1,player2)
    io.in(player1).in(player2).emit("quit")
  })
  socket.on("disconnect",()=>{
    const leftId=removeRoom(socket.id)
    io.in(leftId).emit("oppenetLeft")
    console.log("dis",socket.id)
  })
})     

http.listen(PORT, () => {
  console.log('listening on *:4000');
})