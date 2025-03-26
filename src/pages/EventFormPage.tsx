import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { z } from 'zod';
import Form from '../components/Form';
import { Event } from '../types/Event';
import { Field } from '../types/Form';

const API_URL = 'https://rf-json-server.herokuapp.com/events';

const formSchema = z.object({
  name: z.string().nonempty('Name is required'),
  description: z.string().optional(),
  company: z.string().nonempty('Company is required'),
  color: z.enum([
    'black', 'silver', 'gray', 'white', 'maroon', 'red', 'purple', 'fuchsia',
    'green', 'lime', 'olive', 'yellow', 'navy', 'blue', 'teal', 'aqua',
  ], { errorMap: () => ({ message: 'Color must be a valid web-safe color name' }) }),
});

const EventFormPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const eventData = (location.state?.eventData || {}) as Partial<Event>;

  const fields: Field[] = [
    { name: 'name', label: 'Event Name', placeholder: 'Enter event name', defaultValue: eventData.name || '' },
    { name: 'date', label: 'Date', type: 'date', defaultValue: eventData.date || '' },
    { name: 'time', label: 'Time', type: 'time', defaultValue: eventData.time || '' },
    { name: 'company', label: 'Company', placeholder: 'Enter company name', defaultValue: eventData.company || '' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter email', defaultValue: eventData.email || '' },
    { name: 'phone', label: 'Phone', type: 'tel', placeholder: 'Enter phone number', defaultValue: eventData.phone || '' },
    { name: 'address', label: 'Address', placeholder: 'Enter address', defaultValue: eventData.address || '' },
    { name: 'description', label: 'Description', placeholder: 'Enter description', defaultValue: eventData.description || '' },
    {
      name: 'color',
      label: 'Color',
      type: 'select',
      placeholder: 'Select a color',
      defaultValue: eventData.color || '',
      options: formSchema.shape.color.options,
    },
    { name: 'image', label: 'Image URL', type: 'url', placeholder: 'Enter image URL', defaultValue: eventData.image || '' },
    { name: 'createdOn', label: 'Created On', type: 'datetime-local', defaultValue: eventData.createdOn || '' },
  ];

  const handleFormSubmit = async (formData: Record<string, string>) => {
    try {
      formSchema.parse(formData);

      if (eventData.id) {
        await axios.put(`${API_URL}/${eventData.id}`, formData);
        toast.success('Event updated successfully!');
      } else {
        await axios.post(API_URL, formData);
        toast.success('Event created successfully!');
      }
      navigate('/');
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => toast.error(err.message));
      } else {
        console.error('Error submitting the form:', error);
        toast.error('Failed to submit the form. Please try again.');
      }
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Event Form</h1>
      <Form fields={fields} onSubmit={handleFormSubmit} onCancel={handleCancel} />
    </div>
  );
};

export default EventFormPage;