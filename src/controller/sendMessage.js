import {sendToQueue} from "../config/rabbitmq.js";
import {ChatModel} from "../model/chatModel.js";

export const sendMessage = async (req, res) => {
	try {
		const {chat_id, sender_id, message} = req.body;

		const chat = await ChatModel.findOneAndUpdate(
			{chat_id: chat_id},
			{$push: {messages: {sender_id, message}}},
			{new: true}
		);

		sendToQueue("MESSAGE", {
			chat_id: chat.chat_id,
			chat: chat.messages[chat.messages.length - 1],
		}).then(() => {
			console.log("message sent");
			return res.status(200).json({chat});
		});
	} catch (err) {
		console.log(err);
	}
};