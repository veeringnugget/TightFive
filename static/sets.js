// Global Variable:
let activeEl

// Functions:
function removeBody(parentDiv){
    setBody = document.querySelector(".set-body")
    while (setBody.firstElementChild != null){
        setBody.firstElementChild.remove()
    }
}

function addNewRow(){
    // Create new Row:
    let setBody = document.querySelector(".set-body")
    newRow = document.createElement("div")
    newRow.classList.add("row", "mb-3")
    setBody.appendChild(newRow)
    return newRow
}

function newDiv(){
    let newDiv = document.createElement("div")
    newDiv.classList.add("col")
    return newDiv
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
                const jokesData = data.jokesData
                for (let i = 0; i < sectionData.length; i++){
                    // New Row:
                    addNewRow()

                    // Create new Section:
                    let newSection = newDiv()
                    newSection.classList.add("header")
                    newSection.innerHTML = "Section " + sectionData[i][0]
                    newRow.appendChild(newSection)

                    // New Row:
                    addNewRow()

                    // Add Section Title Data:
                    let sectionTitle = newDiv()
                    sectionTitle.classList.add("col-sm-3", "subTitle")
                    sectionTitle.innerHTML = "Section Title"
                    newRow.appendChild(sectionTitle)
                    let titleData = newDiv()
                    titleData.innerHTML = sectionData[i][1]
                    newRow.appendChild(titleData)

                    // New Row:
                    addNewRow()

                    // Add Section Length Data:
                    let sectionLength = newDiv()
                    sectionLength.classList.add("col-sm-3", "subTitle")
                    sectionLength.innerHTML = "Section Length"
                    newRow.appendChild(sectionLength)
                    let lengthData = newDiv()
                    lengthData.innerHTML = sectionData[i][2] + " minutes"
                    newRow.appendChild(lengthData)

                    // Add Jokes per Section:
                    sectionalJokeCount = data.jokeCount[i][1]
                    for (let j = 0; j < sectionalJokeCount; j++){
                        // New Row:
                        addNewRow()
                        // Add Joke Title
                        let jokeTitle = newDiv()
                        jokeTitle.classList.add("col-sm-3", "subTitle")
                        jokeTitle.innerHTML = jokesData[j][1]
                        newRow.appendChild(jokeTitle)
                        // Add Joke Setup
                        let jokeSetup = newDiv()
                        jokeSetup.classList.add("col")
                        jokeSetup.innerHTML = jokesData[j][2]
                        newRow.appendChild(jokeSetup)
                        // Add Joke Punchline
                        let jokePunchline = newDiv()
                        jokePunchline.classList.add("col")
                        jokePunchline.innerHTML = jokesData[j][3]
                        newRow.appendChild(jokePunchline)
                    }
                }
            })
        }
    })
})


