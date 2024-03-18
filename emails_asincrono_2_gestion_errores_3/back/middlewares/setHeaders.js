export const setHeaders = (req, res, next) => {

    res.setHeader("Content-type", "application/json")
    next()
}