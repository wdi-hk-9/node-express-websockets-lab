// $().ready(function(){ })
$(function(){

  var base_url = document.domain;
  var socket = io.connect(base_url);

  $('#messageForm').on('submit', function(e){
    e.preventDefault();

    var name    = $('#name').val();
    var message = $('#outgoingMessage').val();

    console.log('name: ', name);
    console.log('message: ', message);

    var data = {name: name, message: message};
    $.ajax({
      url:          '/message',
      type:         'POST',
      contentType:  'application/json',
      dataType:     'json',
      data:         JSON.stringify(data)
    }).done(function(data){
      console.log(data)
    })
  })

  socket.on('connect', function(){
    console.log("We are ONLINE.")
  })

  socket.on('error', function(error){
    console.log('connection failed. ' + error);
  })

  socket.on('incomingMessage', function(data){
    console.log('data: ', data)

    $('#messages').prepend('<b>' + data.name + '</b><br/>' + data.message + "<hr />");
  })
})
