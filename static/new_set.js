// GLOBAL:
let newJoke

// NEW_SET: Add New Section & Update the Section Count
document.addEventListener("DOMContentLoaded", function()
{
    // Store a copy of the original block:
    const original = document.querySelector(".new-section")
    const duplicate = original.cloneNode(true)

    document.addEventListener("click", section => {
        if (section.target.matches(".add-section"))
        {
            const originalDuplicate = duplicate.cloneNode(true)
            let position = section.target.parentElement
            let blocks = position.querySelectorAll(".new-section")
            count = blocks.length + 1
            section = originalDuplicate.childNodes[1].childNodes[1].childNodes[1].innerHTML = "Section " + count
            blocks = blocks[blocks.length - 1]
            blocks.insertAdjacentElement("afterend", originalDuplicate)
            dragDrop()
        }
    })

})
// NEW_SET: Add New Joke
document.addEventListener("DOMContentLoaded", function()
{   
    const original = document.querySelector(".new-joke")
    console.log(original)
    const duplicate = original.cloneNode(true)
    
    document.addEventListener("click", add => {
        if (add.target.matches(".new-joke-button"))
        {   
            const originalDuplicate = duplicate.cloneNode(true)
            let section = add.target.closest(".new-section")
            let location = section.querySelectorAll(".new-joke")
            location = location[location.length - 1]
            location.insertAdjacentElement("afterend", originalDuplicate)
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
    const home = document.querySelector(".home-zone")

    draggables.forEach(draggable => {
        draggable.addEventListener("dragstart", () => {
            draggable.classList.add("dragging")
            dropSource = draggable.parentElement
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

    home.addEventListener("dragover", (e) => {
        e.preventDefault()
    })

    targets.forEach(target => {
        target.addEventListener("drop", (e) => {
            if (!target.classList.contains("locked"))
            {
                current = document.querySelector(".dragging")
                child = target.childNodes[1]
                target.replaceChild(current, child)
                card = target.childNodes[1]
                card.classList.remove("mb-2", "card")
                target.classList.add("locked")
                target.childNodes[1].classList.add("rightTarget")
            }
        })
    })

    home.addEventListener("drop", (e) => {
        current = document.querySelector(".dragging")
        source = current.parentElement
        
        if (source.classList.contains("locked"))
        {
            source.classList.remove("locked")
            current.classList.remove("rightTarget")
            current.classList.add("mb-2", "card")
            home.appendChild(current)
            const duplicateJoke = newJoke.cloneNode(true)
            source.appendChild(duplicateJoke)
        }
    })

}
// NEW_SET: "Show More" Functionality On Material Written

// JOKE_VAULT: Filter Based on User Input
