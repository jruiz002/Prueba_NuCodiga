exports.test = (req, res) => {
    try {
        res.status(200).json({ message: 'Endpoint exitoso' });
    } catch (error) {
        return error;
    }
}