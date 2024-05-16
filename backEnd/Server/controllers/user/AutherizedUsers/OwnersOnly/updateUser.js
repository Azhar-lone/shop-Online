import userModel from '../../../../model/userModel.js'
//problems in this function
export default function updateUser(req, res) {
  let { email, password, name, DOB } = req.body
  userModel
    .findById(req.currentUserUd)
    .then(user => {
      // checking which feilds to update or not

      email = email === undefined ? user.email : email
      password = password === undefined ? user.password : password
      name = name === undefined ? user.name : name
      DOB = DOB === undefined ? user.DOB : DOB

      user = { email, password, name, DOB }
      user.save().then((user) => {
        res.status(200).json({
          msg: 'user updated successfully',
          upadatedUser: user
        })
      })

    })
    .catch(err => {
      return res.status(500).json({
        msg: 'error while updating userInfo',
        error: err.message,
      })
    })
}
