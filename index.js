const addCard = document.querySelector(".add-card"),
popupBox = document.querySelector(".popup-box");
popupTitle = popupBox.querySelector("header p");
CloseIcon = popupBox.querySelector("header i");
titleTag= popupBox.querySelector("input");
descTag = popupBox.querySelector("textarea");
addButton=popupBox.querySelector("button")

const months = ["January", "Fabruary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//getting localstorage notes if exist and parsing them
//to js objact else passing an empty array to notes
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false, updateId;

addCard.addEventListener("click",()=> {
    titleTag.focus();
    popupBox.classList.add("show");
});

CloseIcon.addEventListener("click",()=> {
    isUpdate = false;
    titleTag.value = "";
    descTag.value = "";
    addButton.innerText = "Add Note";
    popupTitle.innerText = "Add a new Note";
    popupBox.classList.remove("show");
});

function showNotes() {
    document.querySelectorAll(".note").forEach(note=>note.remove());
    notes.forEach((note, index) => {
        let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${note.description}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="menu">
                                <li onclick="updateNote(${index}, '${note.title}','${note.description}')"><i class="uil uil-pen"></i>Edit</li>
                                <li onclick="deleteNote(${index})"><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>`
        addCard.insertAdjacentHTML("afterend",liTag);                    
    });
}
showNotes();


function showMenu(elem){
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => { 
        //removing show class from the setting menu on document click
        if(e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show");
        }
    });
}

function deleteNote(noteId) {
    let confirmDel = confirm("Are you sure you want to delete this note?");
    if(!confirmDel) return;
    notes.splice(noteId, 1); // removing selected note from array/tasks
    //saving updated notes to localstorage
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

function updateNote(noteId, title,desc) {
    console.log(noteId, title,desc)
    isUpdate = true;
    updateId = noteId;
    addCard.click();
    titleTag.value = title;
    descTag.value = desc;
    addButton.innerText = "update Note"; 
    popupTitle.innerText = "update a Note";
    // console.log(noteId, title, desc);
}

addButton.addEventListener("click", e => {
    e.preventDefault();
    let noteTitle = titleTag.value,
    noteDesc = descTag.value;

    if (noteTitle||noteDesc) {
        let dateObj = new Date(),
        month = months[dateObj.getMonth()],
        day = dateObj.getDate(),
        year = dateObj.getFullYear();

        let noteInfo = {
            title: noteTitle, 
            description: noteDesc,
            date: `${month} ${day}, ${year}`
        }
        // console.log(noteInfo)
        if(!isUpdate) {
            notes.push(noteInfo);// adding new note to notes
        } else {
            isUpdate = false;
            notes[updateId] = noteInfo; //updating specified note
        }
        
        //saving notes to localstorage
        localStorage.setItem("notes", JSON.stringify(notes));
        CloseIcon.click();
        showNotes();
    }
    console.log("button clicked",noteTitle,noteDesc );
});