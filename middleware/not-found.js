const notFoundMiddleware = (req, res) => res.status(404).send('Your requested route does not exist')

export default notFoundMiddleware