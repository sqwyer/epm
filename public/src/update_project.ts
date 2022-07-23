type UpdateResponse = {
    status: "success" | "error"
    error?: string
    project?: object
}

async function update(id: string, query: object, next?: Function) {
    await postData(`/api/updateproject?id=${id}`, query)
        .then((res: UpdateResponse) => {
            if (res.status == "error") console.error(res.error)
            else if (next) next(res)
        })
        .catch((error) => {
            console.error(error)
        })
}
