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
        }
    })

})
// NEW_SET: Add New Joke
document.addEventListener("DOMContentLoaded", function()
{   
    document.addEventListener("click", add => {
        if (add.target.matches(".new-joke-button"))
        {
            let section = add.target.closest(".new-section")
            let target = section.querySelector(".new-joke")
            let html = section.querySelector(".new-joke")
            const clone = html.cloneNode(true)
            target.insertAdjacentElement("afterend", clone)
        }
    })
})

// NEW_SET: Drag and Drop Functionality
document.addEventListener("DOMContentLoaded", function()
{

})
// NEW_SET: "Show More" Functionality On Material Written

// JOKE_VAULT: Filter Based on User Input
