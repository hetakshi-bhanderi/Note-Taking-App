document.addEventListener("DOMContentLoaded", loadNotes);
let editIndex = null;

function addNote() {
    let noteText = document.getElementById("noteInput").value.trim();
    if (!noteText) return;

    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(noteText);
    localStorage.setItem("notes", JSON.stringify(notes));

    document.getElementById("noteInput").value = "";
    loadNotes();
}

function loadNotes() {
    let notesContainer = document.getElementById("notesContainer");
    notesContainer.innerHTML = "";
    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    notes.forEach((note, index) => {
        let noteElement = document.createElement("div");
        noteElement.classList.add("note");
        noteElement.innerHTML = `
        <span>${note}</span>
        <div class="note-buttons">
        <button class="edit-btn" onclick="openEditModal(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
        </div>`;

        notesContainer.appendChild(noteElement);
    });
}


// Additional notes
function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotes();
}

function openEditModal(index) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    editIndex = index;
    document.getElementById("editNoteInput").value = notes[index];
    document.getElementById("editModal").style.display = "block";
    document.getElementById("modalBg").style.display = "block";

}

function closeModal() {
    document.getElementById("editModal").style.display = "none";
    document.getElementById("modalBg").style.display = "none";
}

function saveEdit() {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    let newText = document.getElementById("editNoteInput").value.trim();

    if (newText) {
        notes[editIndex] = newText;
        localStorage.setItem("notes", JSON.stringify(notes));
        closeModal();
        loadNotes();
    }
}