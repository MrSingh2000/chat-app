const Chat = require("../models/Chat");
const Contacts = require("../models/Contacts");


// saving a new message recieved in the db
const saveMessageToDb = async (payload) => {
    try {
        let between1 = payload.from + payload.to;
        let between2 = payload.to + payload.from;
        let cbetween;
        let prevChat = await Chat.findOne({
            between: between1
        });

        if (!prevChat) {
            prevChat = await Chat.findOne({
                between: between2
            })
            cbetween = between2;
        }
        else {
            cbetween = between1;
        }

        if (!prevChat) {
            await Chat.create(
                {
                    between: between1,
                    message: [{
                        user: payload.from,
                        data: payload.message
                    }]
                }
            );
        }
        else {
            await Chat.updateOne({
                between: cbetween
            },
                {
                    between: cbetween,
                    message: [...prevChat.message, {
                        user: payload.from,
                        data: payload.message,
                    }]
                }
            );
        }

        // updating the last message of the user
        let details = await Contacts.findOne({ user: payload.from });
        let contacts = details.contacts;
        contacts.forEach((cont) => {
            if (cont.data === payload.to) {
                cont.lastChat.from = payload.from;
                cont.lastChat.mess = payload.message;
            }
        });
        details = await Contacts.findOneAndUpdate({ user: payload.from }, {
            $set: {
                "contacts": contacts
            }
        });

    } catch (error) {
        console.log(error);
    }
}

// get the particular chat history from db
const getChat = (to, from) => {
    return new Promise(async (resolve, reject) => {
        try {
            let between1 = from + to;
            let between2 = to + from;
            let cbetween;
            let chat = await Chat.findOne({ between: between1 });
            if (!chat) {
                chat = await Chat.findOne({ between: between2 });
                cbetween = between2;
            }
            else {
                cbetween = between1;
            }
            resolve(chat);
        } catch (error) {
            reject({ error: "DB error occurred! Try again later!" });
        }
    })
}

const setLastChat = async (user, contact, message) => {

}

module.exports = { saveMessageToDb, getChat, setLastChat };