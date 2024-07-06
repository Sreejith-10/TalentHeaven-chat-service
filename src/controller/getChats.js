import {ChatModel} from "../model/chatModel.js";

export const getChat = async (req, res) => {
	try {
		const {id} = req.params;
		const chat = await ChatModel.findOne({chat_id: id});

		if (!chat) {
			const newChat = await ChatModel.create({chat_id: id});
			return res.status(202).json({chats: newChat});
		}
		return res.status(200).json({chats: chat});
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "something went wrong"});
	}
};
