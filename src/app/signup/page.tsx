"use client";

import React from "react";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { supabase } from "@/lib/supabaseClient";
import toast, { Toaster } from "react-hot-toast";

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
  const initialValues: FormValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validate = (values: FormValues) => {
    const errors: Partial<FormValues> = {};

    if (!values.name) errors.name = "Name is required.";
    if (!values.email) {
      errors.email = "Email is required.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address.";
    }
    if (!values.password) errors.password = "Password is required.";
    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required.";
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    return errors;
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: values.name, // Optional: store custom fields
          },
        },
      });

      if (error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.success("Account created! Please check your email to confirm.");
      }
    } catch (err) {
      toast.error("Unexpected error occurred.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
      <Toaster position="top-right" />
      <div className="max-w-md w-full bg-white p-10 rounded-xl shadow-lg text-gray-800">
        <h1 className="text-3xl font-bold mb-8 text-indigo-600 text-center">
          Create Account
        </h1>

        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2 font-semibold">
                Full Name
              </label>
              <Field
                id="name"
                name="name"
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 font-semibold">
                Email address
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 font-semibold">
                Password
              </label>
              <Field
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 font-semibold"
              >
                Confirm Password
              </label>
              <Field
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                placeholder="Confirm your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-md py-3 transition"
            >
              Sign Up
            </button>
          </Form>
        </Formik>

        <p className="mt-8 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
