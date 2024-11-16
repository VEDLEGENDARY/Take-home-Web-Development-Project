import { Button } from '@shadcn/ui';
import { supabase } from '../lib/supabaseClient';

const ContactList = ({ contacts, setContacts }: { contacts: any[], setContacts: React.Dispatch<React.SetStateAction<any[]>> }) => {
  const handleDelete = async (id: string) => {
    const { data, error } = await supabase.from('contacts').delete().match({ id });
    if (data) setContacts((prev) => prev.filter((contact) => contact.id !== id));
  };

  return (
    <div className="mt-4">
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id} className="flex justify-between items-center mb-4 p-4 bg-gray-100 rounded-lg">
            <div>
              <p>{contact.firstName} {contact.lastName}</p>
              <p>{contact.email}</p>
              <p>{contact.phoneNumber}</p>
            </div>
            <div>
              <Button onClick={() => console.log('Edit contact')} variant="outline">Edit</Button>
              <Button onClick={() => handleDelete(contact.id)} variant="outline" color="red" className="ml-2">Delete</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
