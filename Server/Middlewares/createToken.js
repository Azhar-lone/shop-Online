export default function createToken(payload) {
    return (jwt.sign(payload, process.env.JWT_KEY))
}