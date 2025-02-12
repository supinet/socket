import { emitDeleteDocument, emitTextEditor, selectDocument } from "./socket-front-document.js";

const params = new URLSearchParams(window.location.search);

const documentName = params.get("nome");

const textEditor = document.getElementById("editor-texto");
const titleDocument = document.getElementById("titulo-documento");
const btnDelete = document.getElementById("excluir-documento");
titleDocument.textContent = documentName || "No title document!";

selectDocument(documentName);

textEditor.addEventListener("keyup", () => {
   emitTextEditor({
    text: textEditor.value,
    documentName
   });
});

function updateTextEditor(text) {
    textEditor.value = text;
}

btnDelete.addEventListener("click", () => {
    emitDeleteDocument(documentName);
});

function alertAndRedirect(name) {
    if (name === documentName) {
        alert(`Document ${name} deleted!`);
        window.location.href = "/";
    }
}

export { updateTextEditor, alertAndRedirect };