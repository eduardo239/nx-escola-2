export const Button = ({
  primary = true,
  secondary = false,
  danger = false,
  type,
  onClick,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`button ${primary ? 'button--primary' : ''} ${
        secondary ? 'button--secondary' : ''
      } ${className} ${danger ? 'button--danger' : ''}`}
      type={type}
      onClick={onClick}
      {...props}
    >
      {props.children}
    </button>
  );
};

export const ButtonIcon = ({
  primary,
  secondary = false,
  danger = false,
  error = false,
  type,
  onClick,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`${primary ? 'button-icon--primary' : ''} ${
        secondary ? 'button-icon--secondary' : ''
      } ${className} ${danger ? 'button-icon--danger' : ''}`}
      type={type}
      onClick={onClick}
      {...props}
    >
      {props.children}
    </button>
  );
};

export const Input = ({
  id,
  label,
  type = 'text',
  error = false,
  placeholder,
  className,
  value,
  onChange,
  ...props
}) => {
  return (
    <div className={`field ${error ? 'field__error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={className}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export const Textarea = ({
  id,
  rows = 3,
  error = false,
  label,
  placeholder,
  className,
  value,
  onChange,
  ...props
}) => {
  return (
    <div className={`field ${error ? 'field__error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      <textarea
        name={label}
        id={id}
        placeholder={placeholder}
        rows={rows}
        className={className}
        value={value}
        onChange={onChange}
        {...props}
      ></textarea>
    </div>
  );
};
