"use client";

import React from "react";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { supabase } from "@/lib/supabaseClient";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface FormValues {
  email: string;
  password: string;
}

export default function SimpleSignInForm() {
  const router = useRouter();

  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const validate = (values: FormValues) => {
    const errors: Partial<FormValues> = {};

    if (!values.email) {
      errors.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address.";
    }

    if (!values.password) {
      errors.password = "Password is required.";
    }

    return errors;
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        toast.error("Invalid email or password.");
        return;
      }

      toast.success("Signed in successfully!");
     
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong during sign-in.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>

      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-medium">
              Email
            </label>
            <Field
              name="email"
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div>
            <label htmlFor="password" className="block font-medium">
              Password
            </label>
            <Field
              name="password"
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition"
          >
            Sign In
          </button>
        </Form>
      </Formik>

      <p className="mt-6 text-center text-sm text-gray-600">
        Don’t have an account?{" "}
        <Link
          href="/signup"
          className="text-indigo-600 font-medium hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
