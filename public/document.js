import { emitTextEditor, selectDocument } from "./socket-front-document.js";

const params = new URLSearchParams(window.location.search);

const documentName = params.get("nome");

const titleDocument = document.getElementById("titulo-documento");

titleDocument.textContent = documentName || "No title document!";

selectDocument(documentName);

const textEditor = document.getElementById("editor-texto");

textEditor.addEventListener("keyup", () => {
   emitTextEditor({
    text: textEditor.value,
    documentName: documentName
    });
});

function updateTextEditor(text) {
    textEditor.value = text;
}

export { updateTextEditor };