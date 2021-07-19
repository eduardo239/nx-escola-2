export const Button = ({
  primary,
  secondary,
  danger,
  type = 'button',
  full = false,
  onClick,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`button ${primary ? 'button--primary' : ''} ${
        secondary ? 'button--secondary' : ''
      } ${className} ${danger ? 'button--danger' : ''} ${full ? 'w-100' : ''}`}
      type={type}
      onClick={onClick}
      {...props}
    >
      {props.children}
    </button>
  );
};

export const ButtonOutline = ({
  primary,
  secondary,
  danger,
  white,
  type,
  full = false,
  onClick,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`button-outline ${primary ? 'button-outline--primary' : ''} ${
        secondary ? 'button-outline--secondary' : ''
      } ${className} ${danger ? 'button-outline--danger' : ''} ${
        white ? 'button-outline--white' : ''
      } ${full ? 'w-100' : ''}`}
      type={type}
      onClick={onClick}
      {...props}
    >
      {props.children}
    </button>
  );
};

export const ButtonLink = ({
  primary,
  secondary,
  danger,
  white,
  type,
  full = false,
  onClick,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`button-link ${primary ? 'button-link--primary' : ''} ${
        secondary ? 'button-link--secondary' : ''
      } ${className} ${danger ? 'button-link--danger' : ''} ${
        white ? 'button-link--white' : ''
      } ${full ? 'w-100' : ''}`}
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
  secondary,
  danger,
  error = false,
  type,
  full = false,
  onClick,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`button-icon ${primary ? 'button-icon--primary' : ''} ${
        secondary ? 'button-icon--secondary' : ''
      } ${className} ${danger ? 'button-icon--danger' : ''} ${
        full ? 'w-100' : ''
      }`}
      type={type}
      onClick={onClick}
      {...props}
    >
      {props.children}
    </button>
  );
};

export const IconOnly = ({
  primary,
  secondary,
  danger,
  small,
  error = false,
  type,
  full = false,
  onClick,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`icon-button ${primary ? 'icon-button--primary' : ''} ${
        secondary ? 'icon-button--secondary' : ''
      } ${className} ${danger ? 'icon-button--danger' : ''} ${
        full ? 'w-100' : ''
      } ${small ? 'icon-button--small' : ''}`}
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

export const InputButton = ({
  id,
  label,
  type = 'text',
  error = false,
  placeholder,
  onClick,
  primary,
  secondary,
  danger,
  ...props
}) => {
  return (
    <div className={`field-button ${error ? 'field-button__error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      <div className="field-button__input">
        <input id={id} type={type} placeholder={placeholder} />
        <button
          onClick={onClick}
          className={`${primary ? 'button-icon--primary' : ''} ${
            secondary ? 'button-icon--secondary' : ''
          } ${danger ? 'button-icon--danger' : ''}`}
        >
          {props.children}
        </button>
      </div>
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
