// References to HTML elements STARTS
// App elements excluding Sort by container
const appContainer = document.querySelector(".app-container")
const enterBar = document.querySelector(".enter-bar")
const todoListItemsContainer = document.querySelector(".todo-list-items-container")
const completedTitleBarContainer = document.querySelector(".completed-title-container")
const completedListItemsContainer = document.querySelector(".completed-list-items-container")
const bothListItemsContainers = document.querySelectorAll(".list-items-container")
const allTodoListItems = document.querySelectorAll(".todo-list-item")
const allCompletedListItems = document.querySelectorAll(".completed-list-item")
const allListItems = document.querySelectorAll(".list-item")
const completedTitleArrowIcon = document.querySelector(".arrow-icon")
const clearAllButton = document.querySelector(".clear-all-button")
const sortButton = document.querySelector(".sort-by-icon")
// Sort by- container elements
const sortListContainer = document.querySelector(".sort-list-container")
const sortListTitleContainer = document.querySelector(".sort-list-title-container")
const sortListItemsContainer = document.querySelector(".sort-list-items-container")
// References to HTML elements ENDS





// All event listeners STARTS
enterBar.addEventListener("keyup", enterBarSumbit)
todoListItemsContainer.addEventListener("click", removeParentElement)
bothListItemsContainers.forEach((event) => {
    addEventListener("click", removeParentElement)
});
todoListItemsContainer.addEventListener("click", completeItem)
completedListItemsContainer.addEventListener("click", unCompleteItem)
completedTitleArrowIcon.addEventListener("click", toggleCompletedContainer)
clearAllButton.addEventListener("click", clearAllCompletedItems)
sortButton.addEventListener("click", showSortByContainer)
sortListItemsContainer.addEventListener("click", chooseSortingMethod)
// Sort by- container elements

// All event listeners ENDS




let timeOfSubmitArray = []
// Object for storing timestamps and text content of when new item is submitted to the listn
let timeOfSubmitObject = {
    1 : "This is a list item 📝",
    2 : "This is another list item 📝",
    3 : "This is a completed item ✅",
    4 : "This is another completed item ✅"
}


// Functions STARTS
// When user submits a new list item by pressing Enter
function enterBarSumbit(event) {
    if (event.keyCode === 13) {
        newItem()
        event.preventDefault()
    }
}
// Calculate the total number of list items. To-do list items + Completed list items = total
function calculateAmountOfListItems() {
    const todoItems = todoListItemsContainer.children.length
    return todoItems
}
// CREATE NEW LIST ITEM for the todo list
function newItem() {
    // Calculates current amount of list items
    let currentAmountOfListItems = calculateAmountOfListItems()

    const enterBarValueBeforeConversionToLowerCase = enterBar.value
    const enterBarValue = enterBarValueBeforeConversionToLowerCase.toLowerCase()
    if (enterBarValue.length >= 3 && enterBarValue.length < 50) {
        // Create elements for the new list item
        const newListItem = document.createElement("li")
        const newListItemContent = document.createElement("p")
        const newCrossImg = document.createElement("img")
        const newCircleImg = document.createElement("img")
    
        // Set content of the list item to the value of the enter bar and set attributes and clases for the elements of the list item
        newListItemContent.textContent = enterBarValue
        newListItem.classList.add("todo-list-item", "list-item", "list-item" + (currentAmountOfListItems + 1))
        newListItemContent.setAttribute("class", "list-item-content")
        newCrossImg.setAttribute("src", "Materiaalit/Icons/cross.svg")
        newCrossImg.setAttribute("class", "cross-icon icon hover-effect")
        newCircleImg.setAttribute("src", "Materiaalit/Icons/circle.svg")
        newCircleImg.setAttribute("class", "circle-icon icon hover-effect")
    
        // Place new list item to the HTML on top of the list
        todoListItemsContainer.insertAdjacentElement("afterbegin", newListItem)
        newListItem.insertAdjacentElement("afterbegin", newCrossImg)
        newListItem.insertAdjacentElement("afterbegin", newListItemContent)
        newListItem.insertAdjacentElement("afterbegin", newCircleImg)
        // Set enter bar value to empty string so that the placeholder text shows
        enterBar.value = ""

        // Place submit time and content into timeofSubmitObject- object
        const timeOfSubmit = Date.now()
        timeOfSubmitObject[timeOfSubmit] = enterBarValue

        selectActiveSortingMethodAndSort()

    } else if (appContainer.firstElementChild.classList.contains("alert-element")) {
        // do nothing if form input validation error alert is showing
    } else {
        // Show alert and make it disapprea after 3 seconds
        const alertElement = document.createElement("p")
        alertElement.classList.toggle("alert-element")
        alertElement.textContent = "Write something thats long and short enough!"
        appContainer.insertAdjacentElement("afterbegin", alertElement)
        setTimeout(() => {
            alertElement.remove()
        }, 3000)
    }
}



// REMOVE ITEM FROM EITHER LIST by pressing the cross icon
function removeParentElement(event) {
    if (event.target.classList.contains("cross-icon")) {
        event.target.parentNode.remove()   
    }
}

// MARK ITEM COMPLETE by pressing the circle button
function completeItem(event) {
    if (event.target.classList.contains("circle-icon")) {
        completedListItemsContainer.insertAdjacentElement("afterbegin", event.target.parentNode)
        event.target.parentNode.classList.replace("todo-list-item", "completed-list-item")
        event.target.setAttribute("src", "Materiaalit/Icons/checkmark-checked.svg")
        event.target.classList.replace("circle-icon", "checkmark-checked-icon")
    }
}

// MARK COMPLETED ITEM UN-COMPLETE by pressing the checkmarked icon
function unCompleteItem(event) {
    if (event.target.classList.contains("checkmark-checked-icon")) {
        todoListItemsContainer.insertAdjacentElement("afterbegin", event.target.parentNode)
        event.target.parentNode.classList.replace("completed-list-item", "todo-list-item")
        event.target.setAttribute("src", "Materiaalit/Icons/circle.svg")
        event.target.classList.replace("checkmark-checked-icon", "circle-icon")    
        selectActiveSortingMethodAndSort()

    }
}

// SHOW / TOGGLE COMPLETED LIST ITEMS by clicking the arrow logo
function toggleCompletedContainer(event) {

    // Hide Completed items
    if (!completedListItemsContainer.classList.contains("hide-element")) {
        completedListItemsContainer.classList.toggle("hide-element")
        completedTitleArrowIcon.setAttribute("src", "Materiaalit/Icons/arrow-down.svg")
        completedTitleArrowIcon.classList.replace("arrow-icon-up", "arrow-icon-down")
        clearAllButton.classList.toggle("hide-element")
        
        // Show Completed items
    } else {
        completedListItemsContainer.classList.toggle("hide-element")
        completedTitleArrowIcon.setAttribute("src", "Materiaalit/Icons/arrow-up.svg")
        completedTitleArrowIcon.classList.replace("arrow-icon-down", "arrow-icon-up")
        clearAllButton.classList.toggle("hide-element")
    }
}

// When user clicks "CLEAR ALL" button all item sin the completed items list are removed
function clearAllCompletedItems(event){
    const everyCompletedItem = completedListItemsContainer.children
    const everyCompletedItemAsArray = Array.from(everyCompletedItem)
    everyCompletedItemAsArray.forEach((item) => {
        item.remove()
    })
}



// SORTING STARTS SORTING STARTS SORTING STARTS SORTING STARTS SORTING STARTS SORTING STARTS SORTING STARTS SORTING STARTS SORTING STARTS SORTING STARTS 

// TOGGLE SORT-BY container
function showSortByContainer(event) {
    sortListContainer.classList.toggle("hide-element")
}

// Remove selected-sorting-method class from EVERY SORTING METHOD (before selecting a new one)
function removeSelectedSortingMethodClass() {
    let sortListItemsContainerAsArray = Array.from(sortListItemsContainer.children)
    sortListItemsContainerAsArray.forEach((child) => {
        child.classList.remove("selected-sorting-method")
    })
}

// CHOOSE SORT METHOD from the list of sorting options 
function chooseSortingMethod(event) {
    if (event.target === sortListItemsContainer.children[0]) {
        removeSelectedSortingMethodClass()
        event.target.classList.toggle("selected-sorting-method")
        sortItemsNewestFirst()
    } else if (event.target === sortListItemsContainer.children[1]) {
        removeSelectedSortingMethodClass()
        event.target.classList.toggle("selected-sorting-method")
        sortItemsNewestLast()
    } else if (event.target === sortListItemsContainer.children[2]) {
        removeSelectedSortingMethodClass()
        event.target.classList.toggle("selected-sorting-method")
        sortListItemsAlphabeticallyAZ()
    } else if (event.target === sortListItemsContainer.children[3]) {
        removeSelectedSortingMethodClass()
        event.target.classList.toggle("selected-sorting-method")
        sortListItemsAlphabeticallyZA()
    }    
}

// SORT BY USING THE ACTIVE SORTING METHOD and sort by that when performing actions on the lists 
function selectActiveSortingMethodAndSort() {
    if (sortListItemsContainer.children[0].classList.contains("selected-sorting-method")) {
        sortItemsNewestFirst()
    }
    else if (sortListItemsContainer.children[1].classList.contains("selected-sorting-method")) {
        sortItemsNewestLast()
    }
    else if (sortListItemsContainer.children[2].classList.contains("selected-sorting-method")) {
        sortListItemsAlphabeticallyAZ()
    }
    else if (sortListItemsContainer.children[3].classList.contains("selected-sorting-method")) {
        sortListItemsAlphabeticallyZA()
    }
}



// SORT list items NEWEST FIRST
function sortItemsNewestFirst() {
    // Get current todo list items content in an array form
    let listItems = []
    for (let i = 0; i < todoListItemsContainer.children.length; i++) {
        listItems.push(todoListItemsContainer.children[i].children[1].textContent)
    }

    let valuesOfTimeOfSubmitObject = Object.values(timeOfSubmitObject)
    let listInOrderOfSubmit = []
    for (const value of valuesOfTimeOfSubmitObject) {
        if (listItems.includes(value)) {
            listInOrderOfSubmit.push(value)
        }
    }
    let listInOrderOfSubmitInReverse = listInOrderOfSubmit.reverse()
    for (let i = 0; i < todoListItemsContainer.children.length; i++) {
        todoListItemsContainer.children[i].children[1].textContent = listInOrderOfSubmitInReverse   [i]
    }
}
// SORT list items NEWEST LAST
function sortItemsNewestLast() {
    // Get current todo list items content in an array form
    let listItems = []
    for (let i = 0; i < todoListItemsContainer.children.length; i++) {
        listItems.push(todoListItemsContainer.children[i].children[1].textContent)
    }
    let listInOrderOfSubmit = []
    let valuesOfTimeOfSubmitObject = Object.values(timeOfSubmitObject)
    for (const value of valuesOfTimeOfSubmitObject) {
        if (listItems.includes(value)) {
            listInOrderOfSubmit.push(value)
        }
    }
    for (let i = 0; i < todoListItemsContainer.children.length; i++) {
        todoListItemsContainer.children[i].children[1].textContent = listInOrderOfSubmit[i]
    }
}






// SORT list items ALPHABETICALLY A - Z
function sortListItemsAlphabeticallyAZ() {
    // Get current todo list items content in an array form
    let listItems = []
    for (let i = 0; i < todoListItemsContainer.children.length; i++) {
        listItems.push(todoListItemsContainer.children[i].children[1].textContent)
    }
    listItems.sort()
    for (let i = 0; i < todoListItemsContainer.children.length; i++) {
        todoListItemsContainer.children[i].children[1].textContent = listItems[i]
    }
}


// SORT list items ALPHABETICALLY Z - A
function sortListItemsAlphabeticallyZA() {
    // Get current todo list items content in an array form
    let listItems = []
    for (let i = 0; i < todoListItemsContainer.children.length; i++) {
        listItems.push(todoListItemsContainer.children[i].children[1].textContent)
    }
    listItems.sort()
    listItems.reverse()
    for (let i = 0; i < todoListItemsContainer.children.length; i++) {
        todoListItemsContainer.children[i].children[1].textContent = listItems[i]
    }
}


// SORTIN ENDS SORTIN ENDS SORTIN ENDS SORTIN ENDS SORTIN ENDS SORTIN ENDS SORTIN ENDS SORTIN ENDS SORTIN ENDS SORTIN ENDS SORTIN ENDS SORTIN ENDS SORTIN ENDS 







// Functions END



// TESTING AREA STARTS

























// ARCHIVED CODE FOR LATER CONSIDERATION // ARCHIVED CODE FOR LATER CONSIDERATION // ARCHIVED CODE FOR LATER CONSIDERATION 


// Store (set) app container contents to localStorage
// function storeAppContainerContents() {
//     // Set both lists contents' to local storage
//     localStorage.setItem("todoData", todoListItemsContainer.innerHTML)
//     localStorage.setItem("completedData", completedListItemsContainer.innerHTML)
//     localStorage.setItem("sortListContainerData", sortListContainer.innerHTML)

//     // Toggle class list and display thigies
//     localStorage.setItem("completedListItemsContainerClassListValue", completedListItemsContainer.classList.value)
//     // localStorage.setItem("completedTitleBarInnerHTMLcontent", completedTitleBarContainer.innerHTML)

// }
// // Get stored app container contents from localStorage
// function getStoredAppContainerContens() {
//     if (localStorage.length === 0) {
//         // do nothing
//     } else {
//         // Get both lists contents' from local storage
//         todoListItemsContainer.innerHTML = localStorage.getItem("todoData")
//         completedListItemsContainer.innerHTML = localStorage.getItem("completedData")
//         sortListContainer.innerHTML = localStorage.getItem("sortListContainerData")

//         // Toggle class list and display thigies
//         completedListItemsContainer.classList = localStorage.getItem("completedListItemsContainerClassListValue")
//         // completedTitleBarContainer.innerHTML = localStorage.getItem("completedTitleBarInnerHTMLcontent")




//         // SOME ERROR LOGS// SOME ERROR LOGS// SOME ERROR LOGS// SOME ERROR LOGS// SOME ERROR LOGS// SOME ERROR LOGS// SOME ERROR LOGS
//         // console.log("here is how the data is stored in *place here* at the time of reload HTML :" + completedTitleBarContainer.innerHTML);
//         // console.log("here is how the data is stored in *place here* at the time of reload LS " + localStorage.getItem("completedTitleBarInnerHTMLcontent"));     
//     }
// }
// getStoredAppContainerContens()




// ALTERNATE STORE-APP-AS-ONE-THING- METHOD
// // Store (set) app container contents to localStorage
// function storeAppContainerContents() {
//     // Set both lists contents' to local storage
//     localStorage.setItem("appData", appContainer.innerHTML)

// }



