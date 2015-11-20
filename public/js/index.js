// Write the front end javascript here
$( document ).ready(function() {

  $('#messageForm').on('click', function(e){
    e.preventdefault;
    console.log('clicked');

    var name    = $('#name').val;
    var message = $('#message').val;

    console.log(name)


    $.ajax({
      url:          '/message',
      type:         'POST',
      contentType:  'application/json',
      dataType:     'json',
      data:         {name: name, message: message}
    });

  })


})
