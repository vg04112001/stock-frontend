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
}) => {
  return (
    <div>
      {label && <label htmlFor={label}>{label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        required
        className={className}
        style={style}
        min={min}
        max={max}
      />
    </div>
  );
};

export default Input;
