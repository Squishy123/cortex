module.exports = (funct) => {
    return (req, res, next) => {
        Promise.resolve(funct(req, res, next)).catch(next);
    }
}