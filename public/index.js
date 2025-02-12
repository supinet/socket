import { emitAddDocument } from "./socket-front-index.js";

const documents = document.getElementById("lista-documentos");
const form = document.getElementById("form-adiciona-documento");
const inputDocument = document.getElementById("input-documento");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  emitAddDocument(inputDocument.value);
  inputDocument.value = "";
});

function insertLinkDocument(documentName) {
    documents.innerHTML += `
      <a href="documento.html?nome=${documentName}"
      class="list-group-item list-group-item-action"
      id="documento-${documentName}"
      >
        ${documentName}
      </a>
    `;
}

function deleteLinkDocument(name) {
  const doc = document.getElementById(`documento-${name}`);
  documents.removeChild(doc);
}

export { insertLinkDocument, deleteLinkDocument };