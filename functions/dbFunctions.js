const Chat = require("../models/Chat");

// saving a new message recieved in the db
const saveMessageToDb = async (payload) => {
    try {
        let prevChat = await Chat.findOne({
            from: payload.from,
            to: payload.to
        });
        if (!prevChat) {
            await Chat.create(
                {
                    to: payload.to,
                    from: payload.from,
                    message: [{
                        data: payload.message
                    }]
                }
            );
        }
        else {
            await Chat.updateOne({ from: payload.from, to: payload.to },
                {
                    to: payload.to,
                    from: payload.from,
                    message: [...prevChat.message, {
                        data: payload.message,
                    }]
                }
            );
        }
    } catch (error) {
        console.log(error);
    }
}

// get the particular chat history from db
const getChat = (to, from) => {
    return new Promise(async (resolve, reject) => {
        try {
            let chat = await Chat.findOne({from, to});
            resolve(chat);
        } catch (error) {
            reject({error: "DB error occurred! Try again later!"});
        }
    })
}

module.exports = {saveMessageToDb, getChat};