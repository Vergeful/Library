let myLibrary = [];

// On window load enable the add book and delete all book buttons:
window.onload = function(){
    const createBook = document.querySelector('.create');
    const deleteAll = document.querySelector('.delete');

    const body = document.querySelector('.body');

    deleteAll.addEventListener('click', () =>{
        body.innerText = '';
        myLibrary.length = 0;
    })

    createBook.addEventListener('click', () =>{
       const modal = document.querySelector('.bg-modal');
       modal.style.display= 'flex';
    })

    topCancel();
    topAdd();
}

function Book(title, author, pages, read, bookIndex){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.bookIndex = bookIndex;

    this.info = function(){
        if(read){
            readStatus = "have read"
        }else{
            readStatus = "not read yet"
        }
         infoString = title + " by " + author + ", " + pages + " pages, " + readStatus
         return infoString
    }
}

Book.prototype.toggle = function(){
    if (this.read){
        this.read = false;
    }else{
        this.read = true;
    }
}

function addBookToLibrary(title, author, pages, read, bookIndex){
    book = new Book(title,author,pages,read, bookIndex);
    myLibrary.push(book);
}

function display(){
    // Empty body
    const body = document.querySelector('.body')
    body.innerText = '';

    // Only iterate through non-null items of the array:
    myLibrary.filter(function(book){ return book !== null }).forEach(book =>{
        const card = document.createElement('div');

        // Each card has its dataset relating to the book index that it contains:
        card.dataset.bookIndex = book.bookIndex;

        const title = document.createElement('div');
        const author = document.createElement('div');
        const pages = document.createElement('div');
        const read = document.createElement('button');

        const close = document.createElement('button');
        close.innerText = '+';
        close.classList.add('close-card');

        // The close and read buttons also relate to their books:
        close.dataset.bookIndex = book.bookIndex;
        read.dataset.bookIndex = book.bookIndex;

        close.addEventListener('click', () =>{
            myLibrary[close.dataset.bookIndex] = null;
            close.parentElement.remove();
        });

        title.innerText = "Title: " + book.title;
        author.innerText = "Author: " + book.author;
        pages.innerText = "Pages: " + book.pages;

        if(book.read){
            read.innerText = "Read";
            read.classList.add('read');
        }else{
            read.innerText = "Not Read";
            read.classList.add('not-read');
        }

        read.addEventListener('click', () =>{
            if (read.classList.contains('read')){
                read.classList.remove('read');
                read.classList.add('not-read');
                read.innerText = 'Not Read';
            }else{
                read.classList.add('read');
                read.classList.remove('not-read');
                read.innerText = 'Read';
            }
            let toggleIndex = read.dataset.bookIndex;
            // alert(toggleIndex);
            myLibrary[toggleIndex].toggle();

        })

        card.classList.add('card');
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(read);
        card.appendChild(close);
        body.appendChild(card);
        
    })
}

function topAdd(){
    const form = document.getElementById('modal-form');
    form.addEventListener('submit', function(event){
        event.preventDefault()

        let title = document.getElementById('title').value;
        let author = document.getElementById('author').value;
        let pages = document.getElementById('pages').value;
        let readStatus = document.getElementById('readStatus').value;
        
        if (readStatus == "not-read"){
            readStatus = false;
        }else{
            readStatus = true;
        }

        let bookIndex = myLibrary.length;

        addBookToLibrary(title,author,pages,readStatus, bookIndex);
        const modal = document.querySelector('.bg-modal');
        modal.style.display= 'none';
        display();
    })
}

function topCancel(){
    const topCancel = document.querySelector('.top-cancel');
    topCancel.addEventListener('click',() =>{
        const modal = document.querySelector('.bg-modal');
        modal.style.display= 'none';
    })
}


