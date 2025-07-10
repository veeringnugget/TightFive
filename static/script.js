// HOMEPAGE: Writing Prompt: Generates a Random Writing Prompt to User
document.addEventListener("DOMContentLoaded", function()
{
    document.getElementById("prompt").addEventListener("click", randomPrompt => {
        async function randomPrompt() {
            const response = await fetch("/gen_new_prompt")
            let randomValue = await response.text()
            document.getElementById("prompt-text").innerHTML = randomValue
        }
        randomPrompt()
    })
})

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
    const duplicate = original.cloneNode(true)
    
    document.addEventListener("click", add => {
        if (add.target.matches(".new-joke-button"))
        {   
            const originalDuplicate = duplicate.cloneNode(true)
            let section = add.target.closest(".new-section")
            let location = section.childNodes[5]
            location.insertAdjacentElement("afterend", originalDuplicate)
            dragDrop()
        }
    })
})

// NEW_SET: Drag and Drop Functionality
document.addEventListener("DOMContentLoaded", function()
{
    dragDrop()
})

function dragDrop()
{
    // Bugs:
    // 1. Only have one joke in a box
    // 2. If joke is in box A, if add another joke selected, joke is duplicated down into B.

    const draggables = document.querySelectorAll(".draggable")
    const targets = document.querySelectorAll(".drop-zone")

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

    targets.forEach(target => {
        target.addEventListener("drop", () => {
            current = document.querySelector(".dragging")
            child = target.childNodes[1]
            target.replaceChild(current, child)
            card = target.childNodes[1]
            card.classList.remove("mb-2")
            card.classList.remove("card")
        })
    })


}
// NEW_SET: "Show More" Functionality On Material Written

// JOKE_VAULT: Filter Based on User Input
