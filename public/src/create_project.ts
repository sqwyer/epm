const form = document.getElementById("form")
async function submit() {
    await postData("/api/create/project", {
        name:
            (<HTMLInputElement>document.getElementById("name")).value ||
            undefined,
        owner:
            (<HTMLInputElement>document.getElementById("owner")).value ||
            undefined,
        desc: (<HTMLInputElement>document.getElementById("desc")).value || "",
    })
        .then((res) => console.log(res))
        .catch((err) => console.error(err))
}

form.addEventListener("submit", submit)
