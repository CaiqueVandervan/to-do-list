export const formatDate = (date: string) => {
    const newDate = new Date(date)
    return newDate.toLocaleString(navigator.language, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    })
}