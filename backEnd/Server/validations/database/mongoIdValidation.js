import {check} from "express-validator"
const validateId=[
check("id")
.exists().withMessage("id is required")
.isMongoId().withMessage("invalid id")
// .trim().escape()
]
export default validateId