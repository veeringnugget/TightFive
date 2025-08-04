// Global Variable:
let activeEl


function removeBody(parentDiv){
    setBody = document.querySelector(".set-body")
    while (setBody.firstElementChild != null){
        setBody.firstElementChild.remove()
    }
}

// When user selects a set, add a "selected" class to highlight
document.addEventListener("DOMContentLoaded", function(){
    let setBody = document.querySelector(".set-body")
    document.addEventListener("click", e =>{
        if (e.target.matches(".premade-sets")){
            if (activeEl == null){
                activeEl = e.target
                activeEl.classList.add("selected")
            }
            else {
                activeEl.classList.remove("selected")
                activeEl = e.target
                activeEl.classList.add("selected")
                removeBody(setBody)
            }

            // Add Content in the page center:
            // Grab data from the selected title:
            const selectedSet = e.target
            let titleData = selectedSet.dataset.title

            // Update inner text with data:
            document.querySelector(".setTitle").innerHTML = titleData
            
            // Send title to Flask:
            fetch("/sets", {
                method: "POST",
                body: JSON.stringify(selectedSet.innerHTML),
                headers: {"Content-Type": "application/json"}
            })

            .then(res => res.json())
            .then(data => {
                const desc = data.setInfo
                document.querySelector(".set-desc").innerHTML = desc[2]
                const sectionData = data.sectionsInfo
                for (let i = 0; i < sectionData.length; i++){
                    newSection = document.createElement("newSection")
                    newSection.innerHTML = "<p>Section " + sectionData[i][0] + "</p>"
                    setBody.appendChild(newSection)
                }
            })
        }
    })
})


