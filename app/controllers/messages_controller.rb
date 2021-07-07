class MessagesController < ApplicationController
  def create
    # @conversation = Conversation.includes(:recipient).find(params[:conversation_id])
    # @message = @conversation.messages.create(message_params)
    # recipient_id = ([@conversation.recipient_id, @conversation.sender_id] - [@message.user_id]).first
    # # ActionCable.server.broadcast "conversation", message: @message.body, recipient_id: recipient_id
    respond_to do |format|
      format.js
    end
  end

  private

  def message_params
    params.require(:message).permit(:user_id, :body)
  end
end
