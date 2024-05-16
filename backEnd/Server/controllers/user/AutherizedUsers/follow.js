import userModel from "../../../model/userModel.js"
export default async function follow(req, res) {
  try {
    let  recipientId  = req.body.id
    let recipient = await userModel.findById(recipientId)
    let sender = await userModel.findById(req.currentUserId)
    if (!sender || !recipient) {
      return res.status(404).json({
        msg: 'sender or reciever not found',
      })
    }
    if (!recipient.followers.includes(currentUserId)) {
      recipient.followers.push(req.currentUserId)
      sender.following.push(recipientId)
      let afterSender = await sender.save()
      let afterRecipient = await recipient.save()
      return res.status(200).json({
        msg: 'followed successfully',
        recipient: afterRecipient,
        sender: afterSender
      })
    }

    //use remove functions instead of pop .

    let reqIndex = recipient.followers.indexOf(req.currentUserId)
    recipient.followers.splice(reqIndex, 1)
    let sendIndex = sender.following.indexOf(recipientId)
    sender.following.splice(sendIndex, 1)
    let afterSender = await sender.save()
    let afterRecipient = await recipient.save()
    return res.status(200).json({
      msg: 'unfollowed successfully',
      recipient: afterRecipient,
      sender: afterSender
    })
  } catch (error) {
    res.status(500).json({
      msg: 'internal server error',
      error: error.message
    })
  }
}