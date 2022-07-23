function arrayContainsAll(a: any[], b: any[]): boolean {
    return a.every((e) => {
        return b.includes(e)
    })
}

function objectContainsAll(a: any, b: any[]): boolean {
    for (let i = 0; i < b.length; i++) {
        if (!a[b[i]]) return false
    }
    return true
}

export { arrayContainsAll, objectContainsAll }
