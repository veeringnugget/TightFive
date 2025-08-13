// Function:
function active(filter){
    filter.classList.add("selected")
}

function removeActive(filter){
    let parentDiv = filter.parentElement.parentElement
    const length = parentDiv.children.length
    // Start at 1 as location 0 is the <p> tag for the section title (i.e current Jokes)
    for (let i = 1; i < length; i++){
        currentDiv = parentDiv.children[i].children[0]
        if (currentDiv.classList.contains("selected")){
            currentDiv.classList.remove("selected")
        }
    }
}

document.addEventListener("DOMContentLoaded", function(){
    document.addEventListener("click", e =>{
        // Current Jokes
        if (e.target.matches(".current")){
            removeActive(e.target)
            active(e.target)
        }
        // Tags
        if (e.target.matches(".tags")){
            removeActive(e.target)
            active(e.target)
        }
        // Status
        if (e.target.matches(".status")){
            removeActive(e.target)
            active(e.target)
        }
        // Notes
        if (e.target.matches(".notes")){
            removeActive(e.target)
            active(e.target)
        }
    })
})