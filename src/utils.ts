export const transStep2Metre = (step?: string) => {
    if (!step) return 0
    return parseInt(step) * 0.6
}

export const transStep2Kilometer = (step?: string) => {
    return parseFloat((transStep2Metre(step) / 1000).toFixed(2))
}
