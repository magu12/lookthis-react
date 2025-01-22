import React from 'react';
import { FormikProps } from 'formik';
import { Input } from "../Input/Input";
import { SignUpFormValues } from './validation';

interface FormFieldsProps {
  formik: FormikProps<SignUpFormValues>;
}

export const FormFields: React.FC<FormFieldsProps> = ({ formik }) => {
  return (
    <>
      <div className="input-row">
        <Input
          id="username"
          name="username"
          type="text"
          label="Username"
          placeholder="Enter your username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          error={formik.errors.username}
          touched={formik.touched.username}
        />

        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          error={formik.errors.email}
          touched={formik.touched.email}
        />
      </div>

      <div className="input-row">
        <Input
          id="password"
          name="password"
          type="password"
          label="Password"
          placeholder="Enter password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          error={formik.errors.password}
          touched={formik.touched.password}
        />

        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="Confirm your password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          error={formik.errors.confirmPassword}
          touched={formik.touched.confirmPassword}
        />
      </div>
    </>
  );
}; 