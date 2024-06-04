import { z } from 'zod';




const userSchema = z.object({
    email: z.string().email({ message: 'Invalid email format' }), // Optional email with email format validation and message
    password: z.string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .max(16, { message: 'Password cannot exceed 16 characters' }),
    confirmPassword: z.string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .max(16, { message: 'Password cannot exceed 16 characters' }),
    // Ensure passwords match with message
    firstName: z.string().min(3, { message: 'First name is required' }),
    lastName: z.string().min(3, { message: 'Last name is required' }),
    country: z.string().min(2, { message: 'Country is required' }),
    userName: z.string()
        .min(5, { message: 'Username must be at least 5 characters long' })
        .max(20, { message: 'Username cannot exceed 20 characters' })
        .trim(), // Require minimum username length, limit max length, and trim whitespace with messages
}).superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
        ctx.addIssue({
            code: "custom",
            message: "the passwords did'nt match",
            path: ["confirmPassword"]
        })
    }
})




export default userSchema