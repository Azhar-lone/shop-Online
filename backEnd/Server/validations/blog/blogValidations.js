import { param, body } from "express-validator";
import sanitizeHtml from "sanitize-html";

let validateSlug = [
  param("slug").isSlug().withMessage("not a valid slug").escape().trim(),
];

// Define allowed tags and their allowed attributes
const allowedTags = ["h1", "h2", "h3", "h4", "h5", "h6", "p", "img", "a"]; // Allow all heading tags, <p>, <img>, and <a> tags
const allowedAttributes = {
  a: ["href", "target"], // Allow href and target attributes for <a> tags
  img: ["src", "alt"], // Allow src and alt attributes for <img> tags
};

let validateCreateBlog = [
  body("slug")
    .exists()
    .withMessage("slug is required")
    .isSlug()
    .withMessage("not a valid slug")
    .escape()
    .trim(),
  body("blog")
    .exists()
    .withMessage("blog is required")
    .custom((value) => {
      // Sanitize the HTML content against allowed tags and attributes
      const sanitizedHtml = sanitizeHtml(value, {
        allowedTags: allowedTags,
        allowedAttributes: allowedAttributes,
      });
      // Check if the sanitized HTML matches the original (i.e., contains only allowed tags and attributes)
      if (sanitizedHtml !== value) {
        throw new Error("HTML contains disallowed tags or attributes");
      }

      // Return true to indicate validation passed
      return true;
    }),
];

let validateUpdateBlog = [
  body("slug")
    .optional()
    .isSlug()
    .withMessage("not a valid slug")
    .escape()
    .trim(),
  body("blog")
    .optional()
    .custom((value) => {
      // Sanitize the HTML content against allowed tags and attributes
      const sanitizedHtml = sanitizeHtml(value, {
        allowedTags: allowedTags,
        allowedAttributes: allowedAttributes,
      });
      // Check if the sanitized HTML matches the original (i.e., contains only allowed tags and attributes)
      if (sanitizedHtml !== value) {
        throw new Error("HTML contains disallowed tags or attributes");
      }

      // Return true to indicate validation passed
      return true;
    }),
];

export { validateSlug, validateCreateBlog,validateUpdateBlog };
