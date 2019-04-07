$(document).ready(function () {
    var socket = io('http://localhost:3000');
    for (let i = 0; i < 225; i++) {
        $(".caro-board").append('<div class="box"></div>')
    }

    socket.on('notify_new_user_login', function (arrayUser) {
        $('.list').html('')
        arrayUser.map(user => $(".list").append(`<p>${user}</p>`))
    })

    socket.on('Server_send_user_array_Client', function (arrayUser) {
        console.log(arrayUser)
    })

    // bắn tên người dùng lên server
    $(".login > input").keyup(function(event) {
        if(event.keyCode === 13) {
            socket.emit("user_send_name_server", event.target.value)
        }
    })
})