const myLibrary = [];
const bookGrid = document.querySelector('.book-grid')
// constructor for Book
function Book(title, author, pages) {
    this.id = crypto.randomUUID();
    this.title = title
    this.author = author
    this.pages = pages
}

//function to create book and add it to library array
function addBookToLibrary(title, author, pages) {
    const book = new Book(title, author, pages)
    myLibrary.push(book)
}

//Function to loop through array and display given books
function displayBook(myLibrary, bookGrid){
    myLibrary.forEach(book=>{
        //create book item with class and add it to the grid
        const bookItem = document.createElement("div")
        bookItem.classList.add("book")
        bookItem.textContent = (`${book.title} by ${book.author} - ${book.pages} pages`)
        bookGrid.appendChild(bookItem)
    })
}

//populate library
for (let i=0; i<5; i++){
    let title1 = "Da-Book"
    let author1 = "ya-boy"
    let pages1 = "999"
    addBookToLibrary(title1, author1, pages1)
}

displayBook(myLibrary, bookGrid)