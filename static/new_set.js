// Declare Global Variables:
let newJoke

// Add New Section Block & Update the Section Count:
document.addEventListener("DOMContentLoaded", function()
{
    // Store a copy of the original block:
    const sectionTemplate = document.querySelector(".new-section")
    const templateCopy = sectionTemplate.cloneNode(true)

    document.addEventListener("click", e => {
        if (e.target.matches(".add-section"))
        {
            const newSection = templateCopy.cloneNode(true)
            let parentContainer = e.target.parentElement
            let existingSections = parentContainer.querySelectorAll(".new-section")
            let sectionCount = existingSections.length + 1
            newSection.childNodes[1].childNodes[1].childNodes[1].innerHTML = "Section " + sectionCount
            existingSections = existingSections[existingSections.length - 1]
            existingSections.insertAdjacentElement("afterend", newSection)
            dragDrop()
        }
    })

})
// Add a New Joke Row When User Clicks ".new-joke":
document.addEventListener("DOMContentLoaded", function()
{   
    // Store a copy of the original block:
    const jokeTemplate = document.querySelector(".new-joke")
    const templateCopy = jokeTemplate.cloneNode(true)

    document.addEventListener("click", e => {
        if (e.target.matches(".new-joke-button"))
        {   
            const newJoke = templateCopy.cloneNode(true)
            let currentSection = e.target.closest(".new-section")
            let existingJokes = currentSection.querySelectorAll(".new-joke")
            let lastJoke = existingJokes[existingJokes.length - 1]
            lastJoke.insertAdjacentElement("afterend", newJoke)
            dragDrop()
        }
    })
})

// NEW_SET: Drag and Drop Functionality
document.addEventListener("DOMContentLoaded", function()
{
    newJoke = document.querySelector(".drag-joke")
    dragDrop()
})

function dragDrop()
{
    const draggables = document.querySelectorAll(".draggable")
    const targets = document.querySelectorAll(".drop-zone")
    const homeZone = document.querySelector(".home-zone")

    draggables.forEach(draggable => {
        draggable.addEventListener("dragstart", () => {
            draggable.classList.add("dragging")
        })

        draggable.addEventListener("dragend", () => {
            draggable.classList.remove("dragging")
        })
    })

    targets.forEach(target => {
        target.addEventListener("dragover", (e) => {
            e.preventDefault()
        })
    })

    homeZone.addEventListener("dragover", (e) => {
        e.preventDefault()
    })

    targets.forEach(target => {
        target.addEventListener("drop", () => {
            if (!target.classList.contains("locked"))
            {
                let draggedElement = document.querySelector(".dragging")
                let placeholder = target.getElementsByClassName("drag-joke")[0]
                target.replaceChild(draggedElement, placeholder)
                let droppedElement = target.getElementsByClassName("draggable")[0]
                droppedElement.classList.remove("mb-2", "card")
                target.classList.add("locked")
                target.getElementsByClassName("draggable")[0].classList.add("rightTarget")
            }
        })
    })

    homeZone.addEventListener("drop", (e) => {
        let draggedElement = document.querySelector(".dragging")
        let originalContainer = draggedElement.parentElement
        
        if (originalContainer.classList.contains("locked"))
        {
            originalContainer.classList.remove("locked")
            draggedElement.classList.remove("rightTarget")
            draggedElement.classList.add("mb-2", "card")
            homeZone.appendChild(draggedElement)
            const newPlaceholder = newJoke.cloneNode(true)
            originalContainer.appendChild(newPlaceholder)
        }
    })

}
// NEW_SET: "Show More" Functionality On Material Written

// JOKE_VAULT: Filter Based on User Input
