import React from "react";

const Input = ({
  label,
  type = "text",
  name,
  value,
  handleChange,
  className,
  style,
  min,
  max,
  step,
}) => {
  return (
    <div className="flex gap-4 mb-1">
      {label && (
        <label htmlFor={label} className={`w-40`}>
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        required
        className={`${className} w-56 border-2 border-red-200 rounded-md`}
        style={style}
        min={min}
        max={max}
        step={step}
      />
    </div>
  );
};

export default Input;
