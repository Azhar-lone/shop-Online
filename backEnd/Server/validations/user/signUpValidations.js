import { body } from "express-validator"
import dns from 'dns'
import { promisify } from 'util'



const allowedDomains = [
    // 'test.com',
    'gmail.com',
    'hotmail.com',
    'outlook.com',
    'yahoo.com',
    'icloud.com',
    'protonmail.com',
]

const checkEmailDomain = (email) => {
    const domain = email.split('@')[1];
    return allowedDomains.includes(domain);
}
const lookupMxRecords = async (domain) => {
    const resolveMx = promisify(dns.resolveMx);
    try {
        const addresses = await resolveMx(domain);
        return addresses && addresses.length > 0;
    } catch (err) {
        return false;
    }
}


const signUpValidation = [

    // email
    body("email")
        .exists().withMessage("email is required")
        .isEmail().withMessage("not a valid email")
        .custom(async (value) => {
            if (!checkEmailDomain(value)) {
                throw new Error("not an allowed domain");
            }
            const domain = value.split('@')[1];
            if (!(await lookupMxRecords(domain))) {
                throw new Error("email domain does not have valid MX records");
            }
            return true;
        }),
    // .isWhitelisted(allowedDomains).withMessage("not allowed domain"),
    // password
    // phoneNumber
    body("phoneNumber")
        .optional()
        .isMobilePhone().withMessage("not a valid phone Number")
        .trim().escape(),
    body("password")
        .exists().withMessage("password is required")
        .trim()
        .isStrongPassword().withMessage("not A strong password")
        .isLength({ max: 16, min: 8 }).withMessage("not a valid length")
        .escape(),

    // confirm passowrd
    body("confirmPassword")
        .exists().withMessage("confirm password is required")
        .trim()
        .escape()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("password did'nt match")
            }
            return true
        }),
    // first name
    body("firstName")
        .exists().withMessage("first name is required")
        .isString().withMessage("not a valid string")
        .isLength({ max: 12 }).withMessage("not a valid length")
        .escape().trim(),

    // last name
    body("lastName")
        .exists().withMessage("last name is required")
        .isString().withMessage("not a valid string")
        .isLength({ max: 12 }).withMessage("not a valid length")
        .escape(),
    // user name
    body("userName")
        .exists().withMessage("userName is required")
        .isString().withMessage("not a valid string")
        .isLength({ max: 16 }).withMessage("not a valid length")
        .isSlug().withMessage("not a valid userName")
        .escape(),
    // Country
    body("country")
        .exists().withMessage("country is required")
        .isString().withMessage("not a valid string")
        .isLength({ max: 30 }).withMessage("not a valid length")
        .escape().trim(),

]
export default signUpValidation
