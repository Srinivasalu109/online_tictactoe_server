const express=require("express");
const app=express();
const http=require("http").createServer(app);
var io = require('socket.io')(http, {
    cors: {
      origin: '*',
    }
  });
const path=require('path')
  app.get("/hello",(a,b)=>{
  b.render("")
  })
  http.listen(3000,()=>{
    console.log("running")
  })