import {v2} from "cloudinary"

v2.config({
    cloud_name: process.env.Cloudinary_Cloud_Name, 
    api_key: process.env.Cloudinary_API_KEY, 
    api_secret: process.env.Cloudinary_API_SECRET
  })

const storage = undefined

export default storage