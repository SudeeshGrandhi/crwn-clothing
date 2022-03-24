/*Overall button has 3 styles 1)Default 2)Inverted 3)Google sign in*/
import "./button.styles.scss";
const BUTTON_TYPE_CLASSES = {
  google: "google-sign-in",
  inverted: "inverted",
};

const Button = ({ children, buttonType, ...rest }) => {
  return (
    <button
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
