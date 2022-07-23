function objectContainsAll(a: any, b: any[]): boolean {
    for (let i = 0; i < b.length; i++) {
        if (!a[b[i]]) return false
    }
    return true
}

export { objectContainsAll }
