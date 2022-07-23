function saveNameChange(id: string, name: string) {
    update(
        id,
        {
            name,
        },
        function () {
            location.reload()
        }
    )
}

function saveDescChange(id: string, description: string) {
    update(
        id,
        {
            description,
        },
        function () {
            location.reload()
        }
    )
}

// function saveOwnerChange(id: string, owner: string) {
// not avalible yet
// }

const id = document.getElementById("project_id").innerText

document.getElementById("name-save").addEventListener("click", async () => {
    await saveNameChange(
        id,
        (<HTMLInputElement>document.getElementById("name-input")).value
    )
})

document.getElementById("desc-save").addEventListener("click", async () => {
    await saveDescChange(
        id,
        (<HTMLInputElement>document.getElementById("desc-input")).value
    )
})
