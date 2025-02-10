import { findDocument, updateDocument, getDocuments } from './documentDb.js';
import io  from './server.js';

io.on("connection", (socket) => {
    
    socket.on("get_documents", async (responseDocuments) => {
        const documents = await getDocuments();
        responseDocuments(documents);
    })

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