// Define the Contact interface
export interface Contact {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  }
  
// Zod schema for validating contact data
import { z } from 'zod';

export const contactSchema = z.object({
firstName: z.string().min(1, 'First name is required'),
lastName: z.string().min(1, 'Last name is required'),
email: z.string().email('Invalid email address'),
phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
});
