async function acceptInvite(project: string) {
    await postData(`/api/user/invite/accept/${project}`, {
        project
    })
    .then(res => {
        if(res.error) console.error(res.error);
        else window.open(`/project/${project}`, '_self')
    })
    .catch(err => {
        console.error(err);
    })
}
async function denyInvite(project: string) {
    await postData(`/api/user/invite/deny/${project}`, {
        project
    })
        .then(res => {
            if(res.error) console.error(res.error);
            else location.reload()
        })
        .catch(err => {
            console.error(err);
        })
}