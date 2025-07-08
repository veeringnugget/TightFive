// Global Variables:
// Counter for insert_section
let counter = 1;

// Writing Prompt:
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("prompt").addEventListener("click", randomPrompt);
})

async function randomPrompt() {
    const response = await fetch("/gen_new_prompt");
    let randomValue = await response.text();
    document.getElementById("prompt-text").innerHTML = randomValue;
}


// New_Set - Add new section and update section count
document.addEventListener("DOMContentLoaded", function()
{
    document.getElementById("new_section_button").addEventListener("click", insert_section);
})

function insert_section() {
    const section = document.querySelectorAll(".new-section");
    const lastSection = section[section.length-1]
    const clone = lastSection.cloneNode(true);
    const position = clone.querySelector(".section-no");
    counter = counter + 1;
    position.innerHTML = "Section " + counter;
    lastSection.insertAdjacentElement("afterend", clone);
}

// New_Set - Add new joke
document.addEventListener("DOMContentLoaded", function()
{
    document.getElementById("new_joke_button").addEventListener("click", insert_joke);
})

function insert_joke(){
    const position = document.getElementById("new-joke");
    const html = document.getElementById("new-joke").outerHTML;
    position.insertAdjacentHTML("afterend", html)
}
