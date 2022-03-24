import { useState } from "react";
import { createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import { createAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";

import Button from "../button/button.component";

import "./sign-up-form.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const resetFormfields = () => {
    setFormFields(defaultFormFields);
  };
  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert(`passwords do not match`);
      return;
    }
    try {
      const response = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(response.user, { displayName });
      resetFormfields();
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("cannot create user,email already in use");
      } else {
        console.log("user creation encountered an error", err);
      }
    }
  };
  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          onChange={changeHandler}
          required
          name="displayName"
          value={displayName}
        />
        <FormInput
          label="Email"
          type="email"
          onChange={changeHandler}
          required
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          onChange={changeHandler}
          required
          name="password"
          value={password}
        />
        <FormInput
          label="Confirm Password"
          type="password"
          onChange={changeHandler}
          required
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit" children="Sign Up" />
      </form>
    </div>
  );
};

export default SignUpForm;
