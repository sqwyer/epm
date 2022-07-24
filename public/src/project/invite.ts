const project = document.getElementById("project_id").innerText

async function sendInvite(email: string, role: string) {
    await postData(`/api/project/${project}/invite/send`, {
        email,
        role,
    })
        .then((res) => {
            if (res.error) {
                console.error(res.error)
            } else {
                location.reload()
            }
        })
        .catch((err) => {
            console.error(err)
        })
}

document
    .getElementById("send-invite")
    .addEventListener("click", async function () {
        await sendInvite(
            (<HTMLInputElement>document.getElementById("email-input")).value,
            (<HTMLSelectElement>document.getElementById("role-input")).value
        )
    })

// async function cancelInvite(project: string, user: string) {
//     await postData(`/project/${project}/invite/cancel`, {
//         user
//     })
//         .then(res => {

//         })
//         .catch(err => {
//             console.error(err);
//         })
// }

// async function updateInvite(project: string, user: string, role: string) {
//     await postData(`/project/${project}/invite/update`, {
//         user,
//         role
//     })
//         .then(res => {

//         })
//         .catch(err => {
//             console.error(err);
//         })
// }
