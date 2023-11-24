import { z } from 'zod';

// Define Zod schemas matching your Mongoose schemas

// Define the Validation for full name
const ZodFullNamValidation = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

// Define the Validation for address
const ZodAddressValidation = z.object({
  city: z.string().min(1),
  country: z.string().min(1),
  street: z.string().min(1),
});

// Define the Validation for an order
const ZodOrderValidation = z.object({
  productName: z.string(),
  quantity: z.number().int(),
  price: z.number(),
});

// Define the Validation for users
const ZodUserValidation = z.object({
  userId: z.number().int(),
  username: z.string().min(1),
  password: z.string().min(1),
  fullName: ZodFullNamValidation,
  age: z.number(),
  email: z.string().email().min(1),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: ZodAddressValidation,
  orders: z.array(ZodOrderValidation),
});


export default ZodUserValidation;
