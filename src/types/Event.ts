export interface Event {
  id: string;
  name: string;
  description?: string;
  company: string;
  color?: string;
  date?: string;
  time?: string;
  email?: string;
  phone?: string;
  address?: string;
  image?: string;
  createdOn?: string;
  [key: string]: any; // Allow additional properties
}