import { useFormik } from "formik";
import { userSchema } from "../schemas/user.schema";

export default function Form() {
  const onSubmit = (values, actions) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(values));
    actions.resetForm();
  };
  const LOCAL_STORAGE_KEY = "userProfile";

  const { values, handleChange, handleSubmit, errors, touched, isSubmitting } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
      },
      validationSchema: userSchema,
      onSubmit,
    });

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h2>Create Profile</h2>
        <label htmlFor="firstName">First Name</label>
        <input
          value={values.firstName}
          onChange={handleChange}
          id="firstName"
          type="text"
          placeholder="First Name"
          className={errors.firstName && touched.firstName ? "input-error" : ""}
        />
        {errors.firstName && touched.firstName ? (
          <p className="error">{errors.firstName}</p>
        ) : (
          ""
        )}
        <label htmlFor="lastName">Last Name</label>
        <input
          value={values.lastName}
          onChange={handleChange}
          id="lastName"
          type="text"
          placeholder="Last Name"
          className={errors.lastName && touched.lastName ? "input-error" : ""}
        />
        {errors.lastName && touched.lastName ? (
          <p className="error">{errors.lastName}</p>
        ) : (
          ""
        )}
        <label htmlFor="email">Email</label>
        <input
          value={values.email}
          onChange={handleChange}
          id="email"
          type="email"
          placeholder="Enter your email"
          className={errors.email && touched.email ? "input-error" : ""}
        />
        {errors.email && touched.email ? (
          <p className="error">{errors.email}</p>
        ) : (
          ""
        )}
        <label htmlFor="phone">Phone</label>
        <input
          value={values.phone}
          onChange={handleChange}
          id="phone"
          type="number"
          placeholder="Enter your phone"
          className={errors.phone && touched.phone ? "input-error" : ""}
        />
        {errors.phone && touched.phone ? (
          <p className="error">{errors.phone}</p>
        ) : (
          ""
        )}
        <label htmlFor="address">Address</label>
        <input
          value={values.address}
          onChange={handleChange}
          id="address"
          type="text"
          placeholder="Enter your address"
          className={errors.address && touched.address ? "input-error" : ""}
        />
        {errors.address && touched.address ? (
          <p className="error">{errors.address}</p>
        ) : (
          ""
        )}

        <button disabled={isSubmitting} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
