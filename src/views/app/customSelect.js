/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/no-array-index-key */
/* eslint-disable max-classes-per-file */
import React from 'react';
import Select from 'react-select';

const CustomSelect = ({
  name,
  value,
  options,
  isMulti,
  className,
  onChange,
  onBlur,
}) => {
  const handleChange = (e) => {    
    onChange(name, e.id);
  };

  const handleBlur = () => {
    onBlur(name, true);
  };

  return (
    <Select
      className={`react-select ${className}`}
      classNamePrefix="react-select"
      options={options}
      isMulti={isMulti}
      onChange={handleChange}
      onBlur={handleBlur}
      value={value}
    />
  );
};



export {
  CustomSelect
  
};
