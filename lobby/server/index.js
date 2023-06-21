const express = require("express")
const app = express()
const { createServer } = require("http")
const { Server } = require("socket.io")
const userService = require("./services/userService")
const cors = require("cors")

app.use(cors())

const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000"
    }
})

io.on("connection", (socket) => {
    console.log(`socket id: ${socket.id}`)

    socket.on("addMyself", () => {
        console.log(`socket connect with id ${socket.id} on backend side`)
        userService.addUser({
            id: socket.id,
            name: `player`,
            isReady: false
        })
        console.log(userService.getAllUsers())
        io.emit("all_users", userService.getAllUsers())
    })

    socket.on("changeReadyState", () => {
        console.log(`handling ready click for ${socket.id} on backend`)
        const user = userService.getUserById(socket.id)
        const newUser = {...user, isReady: !user.isReady}
        console.log(newUser)
        userService.putUser(newUser, socket.id)
        io.emit("all_users", userService.getAllUsers())
        //you have to check all isReady states there and launch timer
    })

    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
        userService.deleteUser(socket.id)
        socket.broadcast.emit("all_users", userService.getAllUsers())
    });
})

httpServer.listen(3001, () => { console.log(`server is running on port ${3001}`) })