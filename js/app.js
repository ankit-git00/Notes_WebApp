// JavaScript code
document.addEventListener('DOMContentLoaded', function () { /* wait for the page to load */

    showNotes();
    const button = document.getElementById('addBtn'); 
    const input = document.getElementById("addTxt")
    input.addEventListener('keypress', function (event) { // add note if enter is pressed
        if (event.key == "Enter")
            addnotes();
    })
    button.addEventListener('click', addnotes); // add note id button is clicked


    function addnotes() {

        // window.alert('Welcome to Notes App')
        let addTxt = document.getElementById('addTxt');

        let notes = localStorage.getItem("notes");

        if (notes == null) {
            notesObj = [];
        }

        else {
            notesObj = JSON.parse(notes);
        }
        notesObj.push(addTxt.value)
        localStorage.setItem("notes", JSON.stringify(notesObj))
        addTxt.value = "";
        console.log(notesObj);

        showNotes();

    }

// funciton to display notes stored in local storage
    

    // notesObj.forEach(function(element, index) {
    //     console.log(element + " " +index);

    // });

 
    let search = document.getElementById("searchTxt");
search.addEventListener('input', function(){
    let inputval = search.value.toLowerCase(); // search queries in capital are converted to small than matched
    console.log('searching', inputval);

    let noteCards = document.getElementsByClassName('NoteCard my-2 mx-2 card');

    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName('p')[0].innerText;

        console.log(cardTxt);

        if(cardTxt.includes(inputval))
        {
            element.style.display="block";
        }

        else{
            element.style.display= "none";
        }
        
        
    });

});

});
   


function showNotes() {
    let notes = localStorage.getItem('notes');

    if (notes == null) {
        notesObj = []
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
    <div class="NoteCard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Note ${index + 1}</h5>
              <p class="card-text">${element}</p>
              <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
    </div>`;

    });

    notesElm = document.getElementById("notes")

    if (notesObj.length == 0) {
        console.log("empty");
        notesElm.innerHTML = `Nothing to Show.`;
    }

    else {
        notesElm.innerHTML = html;
    }
}   

function deleteNote(index) {
    console.log("I am deleting", index);

    let notes = localStorage.getItem("notes");

    if(notes == null)
    {
        notesObj = [];
    }

    else{
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
      
    }


