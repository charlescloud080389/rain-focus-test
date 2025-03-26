// Type for a single column in the Table component
export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
}

// Props for the Table component
export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyField: keyof T | string;
}