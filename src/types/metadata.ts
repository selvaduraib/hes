// Navigation Menu Types
export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  path?: string;
  children?: MenuItem[];
  badge?: string | number;
}

// Form Field Types
export type FieldType = 
  | 'text' 
  | 'email' 
  | 'password' 
  | 'number' 
  | 'date' 
  | 'datetime-local'
  | 'select' 
  | 'multiselect'
  | 'checkbox' 
  | 'radio' 
  | 'textarea'
  | 'switch'
  | 'file';

export interface FormFieldMetadata {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  defaultValue?: any;
  required?: boolean;
  disabled?: boolean;
  options?: { label: string; value: any }[];
  validation?: {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    custom?: (value: any) => boolean | string;
  };
  grid?: {
    col?: number;
    row?: number;
  };
}

export interface FormMetadata {
  id: string;
  title: string;
  fields: FormFieldMetadata[];
  submitLabel?: string;
  cancelLabel?: string;
  layout?: 'vertical' | 'horizontal' | 'grid';
}

// DataGrid Types
export interface ColumnMetadata {
  field: string;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string | number;
  type?: 'text' | 'number' | 'date' | 'boolean' | 'custom';
  render?: (value: any, row: any) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

export interface DataGridMetadata {
  id: string;
  columns: ColumnMetadata[];
  pagination?: {
    enabled: boolean;
    pageSize: number;
    pageSizeOptions?: number[];
  };
  sorting?: {
    enabled: boolean;
    defaultSort?: { field: string; order: 'asc' | 'desc' };
  };
  filtering?: {
    enabled: boolean;
  };
  selection?: {
    enabled: boolean;
    mode: 'single' | 'multiple';
  };
  export?: {
    enabled: boolean;
    formats: ('csv' | 'excel' | 'pdf')[];
  };
}

// Chart Types
export type ChartType = 'bar' | 'pie' | 'line' | 'area' | 'donut';

export interface ChartMetadata {
  id: string;
  type: ChartType;
  title: string;
  dataKey: string;
  categoryKey?: string;
  valueKey?: string;
  colors?: string[];
  legend?: boolean;
  tooltip?: boolean;
  height?: number;
}

// Dashboard Widget Types
export interface WidgetMetadata {
  id: string;
  type: 'stat' | 'chart' | 'table' | 'map' | 'custom';
  title: string;
  col?: number;
  row?: number;
  width?: number;
  height?: number;
  config?: any;
}

// Page Metadata
export interface PageMetadata {
  id: string;
  title: string;
  path: string;
  layout?: 'default' | 'full' | 'centered';
  widgets?: WidgetMetadata[];
  permissions?: string[];
}

