//importing dependencies
import express from "express";

// importing Middlewares
import {
  AdminAuthorized,
  UserAuth,
  validationError,
} from "../middlewares/auth.js";

//importing Controllers
import {
  // For All
  getBlog,
  getAllBlogs,
  // Autherized Users Only

  // Owners Only

  // Admins Only
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogs/blogsExport.js";

// validations
import {
  validateSlug,
  validateCreateBlog,
  validateUpdateBlog,
} from "../validations/exportValidations.js";

//initializing Router Strict routing enabled
const blogRouter = express.Router({ strict: true });

// public Routes
blogRouter
  .get("/:slug", validateSlug, validationError, getBlog)
  .get("/", getAllBlogs);

blogRouter.use(UserAuth);

// Admins only routes
blogRouter
  .use(AdminAuthorized)
  .post("/", validateCreateBlog, validationError, createBlog)
  .put("/:slug", validateUpdateBlog, validateSlug, validationError, updateBlog)
  .delete("/:slug", validateSlug, validationError, deleteBlog);

export default blogRouter;
