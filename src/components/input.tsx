import type React from "react";

interface Props {
  label?: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string
}

export function Input({ label, value, onChange, placeholder, className }: Props) {
  return (
    <div className={className}>
      <label className="block font-semibold">{label}</label>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2 border rounded"
      />
    </div>
  );
}