import "./form-input.style.scss";
const FormInput = ({ label, ...rest }) => {
  console.log(rest, label);
  return (
    <div className="group">
      <input className="form-input" {...rest} />
      {label && (
        <label
          className={`${rest.value.length ? "shrink" : ""}form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
