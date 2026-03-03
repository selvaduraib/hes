import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormMetadata, FormFieldMetadata } from '@/types/metadata';

interface DynamicFormProps {
  metadata: FormMetadata;
  initialValues?: Record<string, any>;
  onSubmit: (values: Record<string, any>) => void;
  onCancel?: () => void;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({
  metadata,
  initialValues = {},
  onSubmit,
  onCancel,
}) => {
  const { t } = useTranslation();
  const [values, setValues] = useState<Record<string, any>>(
    metadata.fields.reduce((acc, field) => ({
      ...acc,
      [field.name]: initialValues[field.name] ?? field.defaultValue ?? '',
    }), {})
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (name: string, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    metadata.fields.forEach(field => {
      const value = values[field.name];

      if (field.required && !value) {
        newErrors[field.name] = `${field.label} ${t('common.required')}`;
      }

      if (field.validation) {
        const { min, max, minLength, maxLength, pattern, custom } = field.validation;

        if (min !== undefined && value < min) {
          newErrors[field.name] = `Minimum value is ${min}`;
        }
        if (max !== undefined && value > max) {
          newErrors[field.name] = `Maximum value is ${max}`;
        }
        if (minLength !== undefined && value.length < minLength) {
          newErrors[field.name] = `Minimum length is ${minLength}`;
        }
        if (maxLength !== undefined && value.length > maxLength) {
          newErrors[field.name] = `Maximum length is ${maxLength}`;
        }
        if (pattern && !new RegExp(pattern).test(value)) {
          newErrors[field.name] = `Invalid format`;
        }
        if (custom) {
          const result = custom(value);
          if (result !== true) {
            newErrors[field.name] = typeof result === 'string' ? result : 'Invalid value';
          }
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(values);
    }
  };

  const renderField = (field: FormFieldMetadata) => {
    const value = values[field.name];
    const error = errors[field.name];
    const commonProps = {
      id: field.name,
      name: field.name,
      disabled: field.disabled,
      className: `w-full px-3 py-2 border rounded-lg ${
        error
          ? 'border-red-500 focus:ring-red-500'
          : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
      } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`,
    };

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            {...commonProps}
            value={value}
            placeholder={field.placeholder}
            onChange={(e) => handleChange(field.name, e.target.value)}
            rows={4}
          />
        );

      case 'select':
        return (
          <select
            {...commonProps}
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <input
            type="checkbox"
            {...commonProps}
            checked={value}
            onChange={(e) => handleChange(field.name, e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded"
          />
        );

      case 'switch':
        return (
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => handleChange(field.name, e.target.checked)}
              className="sr-only peer"
              disabled={field.disabled}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={field.name}
                  value={opt.value}
                  checked={value === opt.value}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="w-4 h-4 text-blue-600"
                  disabled={field.disabled}
                />
                <span className="text-sm">{opt.label}</span>
              </label>
            ))}
          </div>
        );

      default:
        return (
          <input
            {...commonProps}
            type={field.type}
            value={value}
            placeholder={field.placeholder}
            onChange={(e) => handleChange(field.name, e.target.value)}
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className={metadata.layout === 'grid' ? 'grid grid-cols-2 gap-4' : 'space-y-4'}>
        {metadata.fields.map((field) => (
          <div key={field.name} className={field.type === 'checkbox' || field.type === 'switch' ? 'flex items-center gap-2' : ''}>
            <label
              htmlFor={field.name}
              className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${
                field.type === 'checkbox' || field.type === 'switch' ? 'order-2' : 'mb-1'
              }`}
            >
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {renderField(field)}
            {errors[field.name] && (
              <p className="mt-1 text-sm text-red-500">{errors[field.name]}</p>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-3 justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            {metadata.cancelLabel || t('common.cancel')}
          </button>
        )}
        <button type="submit" className="btn btn-primary">
          {metadata.submitLabel || t('common.submit')}
        </button>
      </div>
    </form>
  );
};

