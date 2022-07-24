async function sendInvite(project: string, user: string, role: string) {
    await postData(`/project/${project}/invite/send`, {
        user,
        role
    })
        .then(res => {
            if(res.error) {
                console.error(res.error)
            }
            else {
                location.reload();
            }
        })
        .catch(err => {
            console.error(err);
        })
}

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
