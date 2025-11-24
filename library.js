const myLibrary = [];
const bookGrid = document.querySelector('.book-grid')
const dialog = document.querySelector("dialog");

//variables to store form inputs
const titleInput = document.getElementById("Title")
const authorInput = document.getElementById("Author")
const pagesInput = document.getElementById("Pages")

//function to handle read status radio button selection
function getReadStatus(){
    const radioButtons = document.getElementsByName('choice'); // Get all radio buttons by name
        let selectedValue = '';

        for (let i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i].checked) { // Check if the current radio button is selected
                selectedValue = radioButtons[i].value; // Get its value
                return selectedValue
            }
        }
}

// constructor for Book
function Book(title, author, pages) {
    this.id = crypto.randomUUID();
    this.title = title
    this.author = author
    this.pages = pages
    this.read = false

}

//function to update read status of book

Book.prototype.toggleReadStatus = function(){
    this.read = !this.read
}

//function to create book and add it to library array
function addBookToLibrary(title, author, pages, readStatus = false) {
    const book = new Book(title, author, pages)
    book.read = readStatus == 'Yes'
    myLibrary.push(book)
}

//Function to loop through array and display given books
function displayBook(myLibrary, bookGrid){
       myLibrary.forEach(book=>{
        
        //create div to hold book, add styling and display book-info
        const bookItem = document.createElement("div")
        bookItem.classList.add("book")
        bookItem.dataset.id = book.id
        
        const title = document.createElement("p")
        title.textContent = `Title: ${book.title}`
        
        const author = document.createElement("p")
        author.textContent = `By: ${book.author}`
        
        const pages = document.createElement("p")
        pages.textContent = `Pages: ${book.pages} pages`
        
        const readStatus = document.createElement("p")
        readStatus.textContent = `Status: ${book.read ? 'Read' : 'Not Read'}`
        readStatus.classList.add("read-status")
        
        //button to toggle read status of book
        const toggleButton = document.createElement("button")
        toggleButton.textContent = "Toggle Read Status"
        toggleButton.classList.add("toggle-read")
        toggleButton.addEventListener("click", () => {
            book.toggleReadStatus()
            bookGrid.innerHTML = ''
            displayBook(myLibrary, bookGrid)
        })

        //button to delete book
        const deleteButton = document.createElement("button")
        deleteButton.classList.add("delete-button")
        deleteButton.textContent = "Delete Book"
        deleteButton.addEventListener("click", (event) =>{
            const element = event.currentTarget
            book.deleteBook(element)
            bookGrid.innerHTML = ''
            displayBook(myLibrary, bookGrid)
        })

        // add everything to the book div and then add the div to the main container
        bookItem.appendChild(title)
        bookItem.appendChild(author)
        bookItem.appendChild(pages)
        bookItem.appendChild(readStatus)
        bookItem.appendChild(toggleButton)
        bookItem.appendChild(deleteButton)
        bookGrid.appendChild(bookItem)
    })
}

//function to delete book
Book.prototype.deleteBook = function(){
    const index = myLibrary.findIndex(book => book.id === this.id)
    if (index !== -1) {
        myLibrary.splice(index, 1)
    }
}

//Function to handle submitting form
function handleFormSubmit(){
    let customTitle = titleInput.value
    let customAuthor = authorInput.value
    let customPages = pagesInput.value
    let readStatus = getReadStatus()
    // Add the book to library
    addBookToLibrary(customTitle, customAuthor, customPages, readStatus)
    
    // Clear the form
    titleInput.value = ''
    authorInput.value = ''
    pagesInput.value = ''
    
    // Reset radio buttons
    const radioButtons = document.getElementsByName('choice')
    radioButtons.forEach(radio => radio.checked = false)

    // Close the dialog
    dialog.close()
    
    // Refresh the display 
    bookGrid.innerHTML = ''
    displayBook(myLibrary, bookGrid)
}

// --Event Listeners For Buttons On Page Load--
const buttons = document.querySelectorAll('.add-button, .create-button')
buttons.forEach(button => {
    button.addEventListener("click", handleButtonClick)
})

//Call required functions based on button click
function handleButtonClick(event){
    const button = event.target
    if(button.classList.contains('add-button')){
        dialog.showModal();
    }
    if(button.classList.contains('create-button')){
        //Get information from text fields
        event.preventDefault();
        handleFormSubmit();
    }
}

//populate library
for (let i=0; i<8; i++){
    let title1 = "Book"
    let author1 = "someone"
    let pages1 = `100${i}`
    addBookToLibrary(title1, author1, pages1)
}

displayBook(myLibrary, bookGrid)