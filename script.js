$('document').ready(function(){
  let chatList = $('ol#conversation');
  let usersMessage = $('textarea#new-message-body');
  let sendButton = $('#new-message-button');
  let personas = ["Me", "Myself", "I"];
  let currentPersona = 0;



  function sendMessage(message, person){

    let currentHour = new Date().getHours();
    let currentMinute = new Date().getMinutes();
    let currentTime = `${currentHour}:${currentMinute}`;
    chatList.append(`
          <li class="message">
            <a class='delete' href='#'>Delete</a>
            <h3 class="author">${person}</h3>
            <p class="message-body">${message}</p>
            <span class="timestamp">${currentTime}</span>
          </li>`);
    // usersMessage.val('');
    // currentPersona > 1 ? currentPersona = 0 : currentPersona += 1;
    // usersMessage.val('');
  }
// ---------------------------SEND BUTTON---------------------

  sendButton.click(function(event){
    event.preventDefault();
    // sendMessage(username.val(), personas[currentPersona]);
    let currentHour = new Date().getHours();
    let currentMinute = new Date().getMinutes();
    let currentTime = `${currentHour}:${currentMinute}`;
    chatList.append(`
          <li class="message">
            <a class='delete' href='#'>Delete</a>
            <h3 class="author">${personas[currentPersona]}</h3>
            <p class="message-body">${usersMessage.val()}</p>
            <span class="timestamp">${currentTime}</span>
          </li>`);

    currentPersona > 1 ? currentPersona = 0 : currentPersona += 1;
usersMessage.val('');
  });

// -------------------------------DELETE MESSAGE--------------------
  chatList.on('click', 'a', function(event){
  console.log(event);
  $(this).parent().remove();
  });

// -------------------PRESS ENTER TO SEND MESSAGE-------------------
  $(document).keypress(function(e) {
    if(e.which == 13) {
        sendButton.trigger('click');
    }
  });

// ---------------------Lonely Ajax Chuck Noris---------------

  $('#lonely').click(function(){
    $.ajax({
      url:"http://api.icndb.com/jokes/random",
      success: function(res){
        console.log("success");
        console.log(res);
        usersMessage.val(res.value.joke);
        sendMessage(res.value.joke, 'Internet');
      },
      error: function(e){
        console.log("console.error();");
        console.log(e);
      },
      complete: function () {
        console.log('complete');
      }
    });
  })

});
