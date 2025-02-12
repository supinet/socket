import { findDocument, updateDocument, getDocuments, addDocument, deleteDocument } from './documentDb.js';
import io  from './server.js';

io.on("connection", (socket) => {
    
    socket.on("get_documents", async (responseDocuments) => {
        const documents = await getDocuments();
        responseDocuments(documents);
    });

    socket.on("add_document", async (name) => {
        const existDocument = (await findDocument(name)) !== null;
        if (existDocument) {
            socket.emit("document_existing", name);
        } else {
            const result = await addDocument(name);
            if (result.acknowledged) {
                io.emit("add_document_interface", name);
            }
        }
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

    socket.on("delete_document", async (name) => {
        const result = await deleteDocument(name);
        if (result.deletedCount) {
            io.emit("delete_document_success", name);
        };
    })
});