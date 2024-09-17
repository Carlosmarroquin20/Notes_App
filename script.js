const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

// Mostrar notas al cargar
function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes") || ""; // Asegura que no se rompa si no hay notas
}
showNotes();

// Actualiza el almacenamiento local
function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

// Crear nueva nota
createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("div");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "images/delete.png";
    img.alt = "Delete"; // Añadir un texto alternativo para la accesibilidad
    inputBox.appendChild(img); // Agregar la imagen al inputBox
    notesContainer.appendChild(inputBox); // Agregar el inputBox al contenedor de notas
    updateStorage(); // Actualiza el almacenamiento al crear una nueva nota

    // Manejar el evento de escritura
    inputBox.addEventListener("input", updateStorage);
});

// Manejar clics en el contenedor de notas
notesContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove(); 
        updateStorage(); // Actualiza el almacenamiento después de eliminar
    }
});

// Prevenir el salto de línea al presionar Enter
document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        event.preventDefault(); // Evita el salto de línea
    }
});

// Hacer que las notas sean movibles
Sortable.create(notesContainer, {
    animation: 150,
    onEnd: function() {
        updateStorage(); // Actualiza el almacenamiento después de mover una nota
    }
});
