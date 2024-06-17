export default async function logout(req, res) {
  try {
    res
      .cookie('login', "", {
        httpOnly: true,
        maxAge: 0,
        expires: Date.now(),
      }).status(200).end()
  
    } catch (error) {
    res.status(500).json({
      msg: 'internal server erorr',
    })
  }
}