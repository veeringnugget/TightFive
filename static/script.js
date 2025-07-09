// Global Variables:
// Counter for insert_section
let counter = 1;

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
        document.getElementById("new_section_button").addEventListener("click", insertSection)
        function insertSection()
        {
            const block = document.querySelectorAll(".new-section")
            const last = block[block.length-1]
            const clone = last.cloneNode(true)
            const position = clone.querySelector(".section-no")
            counter = counter + 1
            position.innerHTML = "Section " + counter
            last.insertAdjacentElement("afterend", clone)
        }
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
