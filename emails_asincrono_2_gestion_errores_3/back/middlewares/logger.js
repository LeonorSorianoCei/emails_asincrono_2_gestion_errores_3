export const logger = (req, res, next) => {
    console.log("Registro guardado, ruta:", req.originalUrl)
    console.log("Time", Date.now())
    next()
}