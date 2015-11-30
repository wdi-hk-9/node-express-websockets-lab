$( document ).ready(function() {

  var base_url = document.domain;
  var socket   = io.connect(base_url);

  $('#messageForm').on('submit', function(e){
    e.preventDefault();

    var name    = $('#name').val();
    var message = $('#outgoingMessage').val();

    var data = {name: name, message: message};
    $.ajax({
      url:          '/message',
      type:         'POST',
      contentType:  'application/json',
      dataType:     'json',
      data:          JSON.stringify(data)
    }).done(function(data){
      console.log(data);
    })
  })

  //listening to incoming message
  socket.on('IncomingMessage', function(data){
    console.log(data)
      $('#messages').prepend('<br>' + data.name + '</b><br/>' + data.message + '<hr / >');
  })

})
