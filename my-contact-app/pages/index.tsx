import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient'; // Import Supabase client
import { ContactForm } from '../components/ContactForm'; // Import Contact Form Component
import { ContactList } from '../components/ContactList'; // Import Contact List Component

// types.ts
import { z } from 'zod';

export const contactSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phoneNumber: z.string().min(1, { message: 'Phone number is required' }),
});

export type Contact = z.infer<typeof contactSchema>;

const Home = () => {
  const [contacts, setContacts] = useState([]);
  
  useEffect(() => {
    const fetchContacts = async () => {
      const { data, error } = await supabase.from('contacts').select('*');
      if (data) setContacts(data);
    };
    fetchContacts();
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-4">Contact List</h1>
        <ContactForm setContacts={setContacts} />
        <ContactList contacts={contacts} setContacts={setContacts} />
      </div>
    </div>
  );
};

export default Home;
