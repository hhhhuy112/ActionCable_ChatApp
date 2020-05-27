import consumer from "./consumer"

consumer.subscriptions.create("ChatsChannel", {
  connected() {
    let conversationId = ""
    let message = ""
    let cs = this
    $("#new_message").submit(function(e) {
      e.preventDefault();
      conversationId = $("#new_message").closest(".card").data("conversation-id");
      message = $("#new_message").children("textarea").val();
      $("#new_message").children("textarea").val("");
      cs.add_messages_for_sender(message);
      cs.send_message(message, conversationId);
    });
  },

  disconnected() {
    console.log("Disconnected");
  },

  received(data) {
      debugger
    this.add_messages_for_reciever(data.message, data.recipient_id);
  }, 
  
  send_message(message, conversation_id) {
    this.perform('send_message',  {message: message, conversation_id: conversation_id});
  }, 

  add_messages_for_reciever(message, reciever_id ){
    $(".message-" + reciever_id + " ul").append(
      '<li>' +
        '<div class="row">' +
          '<div class="content-mess">' +
            '<div class="message-received">' +
              message
            + '</div>' +
          '</div>' +
        '</div>' +
      '</li>'
    );
  }, 

  add_messages_for_sender(message){
    $(".messages-list ul").append(
      '<li>' +
        '<div class="row">' +
          '<div class="content-mess">' +
            '<div class="message-sent">' +
              message
            + '</div>' +
          '</div>' +
        '</div>' +
      '</li>'
    );
  }
  
  // eventHandle(){
      
    
  // }
  
});


 

