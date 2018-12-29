let strTruncation = (value, num) => {
    if (!value) return ''
    if (value.length > num) {
        return value.slice(0, num) + '...'
    }
    return value;
}

export { strTruncation }