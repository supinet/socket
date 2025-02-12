import { deleteLinkDocument, insertLinkDocument } from "./index.js";

const socket = io();

socket.emit("get_documents", (documents) => {
    documents.forEach((document) => {
        insertLinkDocument(document.name);
    })
});

function emitAddDocument(name) {
    socket.emit("add_document", name);
}

socket.on("add_document_interface", (name) => {
    insertLinkDocument(name);
});

socket.on("document_existing", (name) => {
    alert(`The document ${name} already exist`);
});

socket.on("delete_document_success", (name) => {
    deleteLinkDocument(name);
})

export { emitAddDocument };