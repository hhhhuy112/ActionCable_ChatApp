class ChatsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "conversation"
  end

  def unsubscribed
    stop_all_streams
  end

  def send_message(data)
    @conversation = Conversation.find_by(id: data["conversation_id"].to_i)
    receiver_id = @conversation.get_receiver_id current_user.id
    @message = @conversation.messages.create(user_id: current_user.id, body: data["message"])
    ActionCable.server.broadcast "conversation", message: data["message"], recipient_id: receiver_id
  end
end
