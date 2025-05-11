import { useActionState } from "react";

import {
  isEmail,
  isNotEmpty,
  isEqualToOtherValue,
  hasMinLength,
} from "../util/validation";

export default function Signup() {
  const signupAction = (prevFormState, formData) => {
    const userData = Object.fromEntries(formData.entries());
    const acquisition = formData.getAll("acquisition");
    userData.acquisition = acquisition;

    let errors = [];

    if (!isEmail(userData.email)) {
      errors.push("Invalid email address.");
    }

    if (!isNotEmpty(userData.password) || !hasMinLength(userData.password, 6)) {
      errors.push("You must provide a password with at least six characters.");
    }

    if (!isEqualToOtherValue(userData.password, userData["confirm-password"])) {
      errors.push("Password do not match.");
    }

    if (
      !isNotEmpty(userData["first-name"]) ||
      !isNotEmpty(userData["last-name"])
    ) {
      errors.push("Please provide both your first and last name.");
    }

    if (!isNotEmpty(userData.role)) {
      errors.push("Please select a role.");
    }

    if (!userData.terms) {
      errors.push("You must agree to the terms and conditions.");
    }

    if (userData.acquisition.length === 0) {
      errors.push("Please select at least 1 acquisition channel.");
    }

    if (errors.length > 0) {
      return { errors };
    }

    return { errors: null };
  };

  const [formState, formAction] = useActionState(signupAction, {
    errors: null,
  });

  return (
    <form action={formAction}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
          />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" />
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role">
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms" />I
          agree to the terms and conditions
        </label>
      </div>

      {formState.errors && (
        <ul className="error">
          {formState.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button className="button">Sign up</button>
      </p>
    </form>
  );
}
