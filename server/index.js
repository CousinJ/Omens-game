const weapons = require("./character_data/weapons.js")
const skills = require("./character_data/skills.js")
const houses = require("./character_data/houses.js")

const express = require("express");

const cors = require("cors");

const http = require("http");

const { Server } = require("socket.io");

const app = express();
const port = 3001;

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

//assets  ====  character details



let playerArray = [];
let votedArray = [];
//set number that sets who is the warlock based on when they enter the game.
let warlockNum = 2
io.on("connection", (socket) => {
  console.log(socket.id);
 
  
 

  socket.once("initialize-player", (arg) => {
    playerArray.push(arg);
    arg.id = playerArray.length
    arg.role = 0
    arg.turn = false
    arg.playing = false
    //character data from server data module exports
    arg.house = houses[Math.floor(Math.random() * 10)].houseName
    arg.weapon = weapons[Math.floor(Math.random() * 10)].weaponName
    arg.skill = skills[Math.floor(Math.random() * 10)].skillName
    if(playerArray.length === warlockNum) {
      arg.role = 1
    }
    if(playerArray.length === 1) {
        arg.turn = true
        arg.playing = true
        arg.role = 2
    }

    console.log(playerArray)
    
      
      io.emit('start-game', playerArray)

    ;
  });
socket.on('exiting', (arg) => {
    playerArray.forEach((el, i) => {if(el.id === arg.id) {
      playerArray.splice(i , 1)
      console.log(playerArray)
      io.emit('reset-instance', playerArray)
    }})

})


socket.on('check-win', () => {
  let warlocks = 0
  let sages = 0
  playerArray.forEach((el, i) => {if(el.role === 1) {
    warlocks += 1
  } if(el.role === 0) {
    sages += 1
  }
}) 
if(warlocks >= sages) {
  io.emit('see-win', 'Warlocks')
} 
if(warlocks === 0) {
  io.emit('see-win', 'Sages')
}

})

socket.on('sending-prophecy', (arg) => {console.log(arg)
io.emit('r-prophecy', arg)
})

socket.on('switch-play', () => {playerArray.forEach((el) => {el.playing = !el.playing}); console.log(playerArray)
      io.emit('turnt', playerArray)
})

//ENTERING VOTING AREA
socket.on('vote-out', (arg) => {
 
 
  votedArray.push(arg.player)
  console.log(playerArray.length)
  console.log(votedArray.length)
  if(votedArray.length === playerArray.length - 1) {
   
    //go throuought voted array
    //create an object that can be used to determine who is voted out.
    
   let voteObject = {}
   let votes = 1
   for(const el of votedArray) {
    if(voteObject[el]) {
      votes += 1
      voteObject[el] = {votes: votes , name: el}
    } else {
      voteObject[el] = {votes: 1, name: el}
    }
   }


    console.log('voted')
    console.log(voteObject)

    //cycle through voted Object and get the most voted player. 
    //send that to tha front end via io.emit. EVERYONE NEEDS TO SEE WHO GOT  VOTED.
let counter = []
    for(let el in voteObject) {

      counter.push(voteObject[el].votes)
     

      
    }
    
    let votedNum = Math.max(...counter)
    for(let el in voteObject) {
      if(voteObject[el].votes === votedNum) {
        console.log(voteObject[el])
        io.emit('turnt', playerArray)
        io.emit('vote-final', voteObject[el])
       votedArray = []

      }
    }
  } // LEAVING VOTING AREA
 
})

});

server.listen(port, () => {
  console.log(`SERVER IS RUNNING ${port}`);
});
