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
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: ZodAddressValidation,
  orders: z.array(ZodOrderValidation),
});


// const fullNameSchema = z.object({
//   firstName: z.string().min(1),
//   lastName: z.string().min(1),
// });

// const addressSchema = z.object({
//   city: z.string().min(1),
//   country: z.string().min(1),
//   street: z.string().min(1),
// });

// const orderSchema = z.object({
//   productName: z.string().optional(),
//   quantity: z.number().int().optional(),
//   price: z.number().optional(),
// });

// const ZodUserValidation = z.object({
//   userId: z.number().int(),
//   username: z.string().min(1),
//   password: z.string().min(1),
//   fullName: fullNameSchema,
//   age: z.number().int(),
//   email: z.string().email(),
//   isActive: z.boolean(),
//   hobbies: z.array(z.string()),
//   address: addressSchema,
//   orders: z.array(orderSchema),
// });

export default ZodUserValidation;
