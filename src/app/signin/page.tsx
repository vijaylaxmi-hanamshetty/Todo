"use client";

import React from "react";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabase";

interface FormValues {
  email: string;
  password: string;
}

export default function SignIn() {
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
  console.log("Signing in with:", values.email, values.password);
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      console.error("Sign in error:", error);
      toast.error(`Sign in failed: ${error.message}`);
      return;
    }

    if (data.session) {
      toast.success(`Signed in as ${values.email}`);
      console.log("Session data:", data.session);
      // Redirect or further logic here
    } else {
      toast.error("Sign in failed: No session returned.");
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    toast.error(
      `Sign in error: ${error instanceof Error ? error.message : String(error)}`
    );
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="max-w-md w-full bg-white p-10 rounded-xl shadow-lg text-gray-800">
        <h1 className="text-3xl font-bold mb-8 text-indigo-600 text-center">
          Welcome Back
        </h1>

        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-6">
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
                autoComplete="current-password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-md py-3 transition"
            >
              Sign In
            </button>
          </Form>
        </Formik>

        <p className="mt-8 text-center text-gray-600">
          New here?{" "}
          <Link
            href="/signup"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
