"use client";

import { InputHTMLAttributes } from "react";

export default function Input({
  label,
  name,
  onChange,
  placeholder,
  type,
  value,
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div className="form-floating">
      <input
        className="form-control"
        id={`${name}__input`}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />

      <label htmlFor={`${name}__input`}>{label}</label>
    </div>
  );
}
