import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { z } from 'zod';
import { contactSchema } from '../types';
import { Button, Input, Label, Modal } from '@shadcn/ui';

const ContactForm = ({ setContacts }: { setContacts: React.Dispatch<React.SetStateAction<any[]>> }) => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phoneNumber: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState<any>({});
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      contactSchema.parse(formData); // Zod validation
      const { data, error } = await supabase.from('contacts').insert([formData]);
      if (data) {
        setContacts((prev) => [...prev, ...data]);
        setFormData({ firstName: '', lastName: '', email: '', phoneNumber: '' });
      }
    } catch (err) {
      setErrors(err.errors);
    }
  };

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)} variant="solid" color="primary">Add Contact</Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>Add Contact</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input 
                id="firstName" 
                name="firstName" 
                value={formData.firstName} 
                onChange={handleInputChange} 
                className="w-full" 
              />
              {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input 
                id="lastName" 
                name="lastName" 
                value={formData.lastName} 
                onChange={handleInputChange} 
                className="w-full" 
              />
              {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleInputChange} 
                className="w-full" 
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input 
                id="phoneNumber" 
                name="phoneNumber" 
                value={formData.phoneNumber} 
                onChange={handleInputChange} 
                className="w-full" 
              />
              {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber}</p>}
            </div>
            <Button type="submit" variant="solid" color="primary" className="w-full">Submit</Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ContactForm;
