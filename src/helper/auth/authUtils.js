export const authenticate = (data, next) => {
    if (typeof window !== undefined) {
        localStorage.setItem("userInfo", JSON.stringify(data))
        next()
    }
}

export const isAuthenticated = () => {
    if (typeof window === undefined)
        return false
    if (localStorage.getItem("userInfo"))
        return JSON.parse(localStorage.getItem("userInfo"));
    else
        return false
}