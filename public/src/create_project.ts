const form = document.getElementById("form")

type CreateResponse = {
    status: "success"|"error",
    error?: string,
    project?: any,
    recommendedRedirect?: string
}

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
        .then((res: CreateResponse) => {
            if(res.status == "success") window.open(res.recommendedRedirect, '_self')
            else if(res.status == "error") console.error(res.error);
            else console.error("Error loading...")
        })
        .catch((err) => console.error(err))
}

form.addEventListener("submit", submit)
