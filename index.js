var express = require("express")
var app = express()
app.use(express.static("./public"))
app.set("view engine", "ejs")
app.set("views", "./views")
var server = require("http").Server(app)
var io = require('socket.io')(server);

server.listen(3000, () => {
    console.log('start PORT*3000')
})

app.get('/', function(req, res) {
    res.render('home')
})

var arrayUser = []

// SERVER VIEW
io.on("connection", function(socket) {
    console.log("co nguoi vua ket noi", socket.id)

    let sendArrayUser = () => {
        io.emit('Server_send_user_array_Client', arrayUser)
    }

    // GỬI TẤT CẢ USER TRONG HỆ THỐNG
    io.emit('notify_new_user_login', arrayUser)
    
    socket.on("disconnect", function() {
        console.log(socket.id, "vua ngat ket noi")
        arrayUser.pop()
        console.log(arrayUser)
    })

    socket.on('user_send_name_server', function (data) {
        let rs = arrayUser.includes(function(element) {
            console.log(element.id, data.id)
            return element.id === data.id
          }) 
        // console.log(rs, arrayUser)

        socket.name = data
        arrayUser.push({
            id: socket.id,
            name: socket.name
        })
        sendArrayUser()
    })
})