import "./socket-front-index.js";

const documents = document.getElementById("lista-documentos");

function insertLinkDocument(documentName) {
    documents.innerHTML += `
      <a href="documento.html?nome=${documentName}" class="list-group-item list-group-item-action">
        ${documentName}
      </a>
    `;
}

export { insertLinkDocument };