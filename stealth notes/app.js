const body = document.querySelector('body');
const sideNav = document.querySelector('.side-nav');
const noteContainer = document.querySelector('.note__container');
const content = document.querySelector('.content');
const asideBtn = document.querySelector('.asideBtn');
const asideBtn2 = document.querySelector('.asideBtn2');
const heroh1 = document.querySelector('.side-nav section h1');



addEventListener('DOMContentLoaded', () => {
    loadNotes();

})



function showhideNav() {
    body.classList.toggle('show-nav');
    if (body.classList.contains('show-nav')) {
        asideBtn2.style.display = 'none';
        asideBtn.style.display = 'unset';
    } else {
        asideBtn2.style.display = 'unset';
        asideBtn.style.display = 'none';
    }
}

document.querySelector('.create-newBtn').addEventListener('click', () => {
    showhideNav();
})

heroh1.addEventListener('click', () => {
    showhideNav();
    resetActiveNote()
    content.innerHTML = `
        <section class="hero">
                <h1 class="hero-h1">Stealth Notes</h1>
                <p class="hero-p">Stealth Notes is a privacy-focused note-taking app that saves data exclusively to your browser's local storage. It operates client-side, ensuring no information is collected, stored on servers, or shared externally.</p>
                <button class="primary-btn create-newBtn"><p>Create new</p><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg></button>
        </section>
    `;
})

function saveNotes(key, arr) {
    localStorage.setItem(key, JSON.stringify(arr));
    loadNotes();
}

document.addEventListener('click', (event) => {
    if (event.target.closest('.create-newBtn')) {
        resetActiveNote()
        content.innerHTML = `
        <section class="title">
            <input type="text" class="note__title" placeholder="Title" autofocus>
            <div><input type="text" class="note__date" placeholder="Date"><input type="text" class="note__read-time" placeholder="Reading Time"></div>
        </section>
        <textarea type="text" placeholder="Once Upon A..." class="note__text"></textarea>
        <button class="primary-btn note__save">Save</button>
       `;
        const note__title = document.querySelector('.note__title');
        const note__date = document.querySelector('.note__date');
        const note__readTime = document.querySelector('.note__read-time');
        const note__text = document.querySelector('.note__text');
        const saveBtn = document.querySelector('.note__save');
        
        saveBtn.addEventListener('click', () => {
            const title = note__title.value.trim();
            const date = note__date.value.trim();
            const readTime = note__readTime.value.trim();
            const text =  note__text.value.trim();
            if (title && date && readTime && text) {
                saveNotes(title, [date, readTime, text]);
                note__title.value = '';
                note__date.value = '';
                note__readTime.value = '';
                note__text.value = '';
            }
            else {
                alert("incomplete")
            }
        })
    }
});

function resetActiveNote() {
    try {
        document.querySelectorAll('.note').forEach(note => {
            note.style = '';
            const icons = note.querySelectorAll('svg');
            icons.forEach(svg => {
                if (svg.classList.contains('note__icon')) {
                    svg.innerHTML = `
                    <path d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h8a.996.996 0 0 0 .707-.293l7-7a.997.997 0 0 0 .196-.293c.014-.03.022-.061.033-.093a.991.991 0 0 0 .051-.259c.002-.021.013-.041.013-.062V5c0-1.103-.897-2-2-2zM5 5h14v7h-6a1 1 0 0 0-1 1v6H5V5zm9 12.586V14h3.586L14 17.586z"></path>
                `;
                } else {
                    return
                }; 
            });
        });
    } catch (error) {
        console.error('Error in resetActiveNote:', error);
    }
}


function loadNotes() {
    noteContainer.innerHTML = '';
    
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key)
        const loadedArray = value ? JSON.parse(value) : [];
        const newNote = document.createElement('div');
        newNote.classList.add('note');

        const sideNavNoteTitle = () => {
            if (key.length <= 18) {
                return key
            }
            return key.slice(0, 18) + '...'
        }
        const optionContainer = document.createElement('div');
        optionContainer.style.position = 'relative';



        const optionSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        optionSvg.setAttribute('xlmns', 'http://www.w3.org/2000/svg');
        optionSvg.setAttribute('width', '24');
        optionSvg.setAttribute('height', '24');
        optionSvg.setAttribute('viewBox', '0 0 24 24');
        optionSvg.classList.add('note__options');

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute('d', 'M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z');

        optionSvg.appendChild(path);
        const renameDel = document.createElement('div');

        optionContainer.appendChild(optionSvg);
        optionContainer.appendChild(renameDel);
        optionContainer.style.border = '1px solid green';
        optionSvg.addEventListener('click', () => {
            optionSvg.onpointercancel
        })

        const noteSection = document.createElement('div');
        noteSection.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="note__icon"><path d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h8a.996.996 0 0 0 .707-.293l7-7a.997.997 0 0 0 .196-.293c.014-.03.022-.061.033-.093a.991.991 0 0 0 .051-.259c.002-.021.013-.041.013-.062V5c0-1.103-.897-2-2-2zM5 5h14v7h-6a1 1 0 0 0-1 1v6H5V5zm9 12.586V14h3.586L14 17.586z"></path></svg>
            <p>${sideNavNoteTitle()}</p>
        `;
        newNote.appendChild(noteSection);
        newNote.appendChild(optionContainer)
        noteContainer.appendChild(newNote); 

        noteSection.addEventListener('click', () => {
            resetActiveNote();
            showhideNav();
            newNote.style.backgroundColor = 'hsl(0, 0%, 20%)';
            newNote.style.color = 'hsl(100, 100%, 40%)';
            noteSection.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="note__icon"><path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8l8-8V5a2 2 0 0 0-2-2zm-7 16v-7h7l-7 7z"></path></svg>
            <p>${sideNavNoteTitle()}</p>
            `;
            content.innerHTML = `
            <section class="title">
                <h1 class="note__title">${key}</h1>
                <div><p class="note__date">${loadedArray[0]}</p><p class="note__read-time">${loadedArray[1]}</p></div>
            </section>
            <p class="note__text">${loadedArray[2]}</p>
            `;
        })
    }
    
}

