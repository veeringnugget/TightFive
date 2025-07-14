//Writing Prompt: Generates a Random Writing Prompt to User

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