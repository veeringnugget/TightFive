// Global Variable:
let activeEl

// When user selects a set, add a "selected" class to highlight
document.addEventListener("DOMContentLoaded", function(){
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
            })

        }
    })
})


