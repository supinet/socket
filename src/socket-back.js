import { findDocument, updateDocument } from './documentDb.js';
import io  from './server.js';

io.on("connection", (socket) => {
    console.log("A client has been connected! ID: ", socket.id);

    socket.on("select_document", async (documentName, responseText) => {
        socket.join(documentName)
        const document = await findDocument(documentName);
        if (document) {
            responseText(document.text);
        }
    });

    socket.on("text_editor", async ({ text, documentName }) => {
        const update = await updateDocument(documentName, text);
        if (update.modifiedCount) {
            socket.to(documentName).emit('text_editor_clients', text);
        }
    });
});