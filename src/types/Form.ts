// Type for a single field in the Form component
export interface Field {
  name: string;
  label: string;
  type?: string; // e.g., "text", "email", "select"
  placeholder?: string;
  defaultValue?: string;
  options?: string[]; // For select fields
}

// Props for the Form component
export interface FormProps {
  fields: Field[];
  onSubmit: (formData: Record<string, string>) => void;
  onCancel: () => void;
}