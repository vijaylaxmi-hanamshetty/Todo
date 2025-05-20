'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import AuthGuard from '../components/AuthGuard'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { name, email, message } = formData

    const loadingToast = toast.loading('Sending message...')

    // Simulate async action
    setTimeout(() => {
      toast.dismiss(loadingToast)
      toast.success('✅ Message sent (simulation).')
      setFormData({ name: '', email: '', message: '' })
    }, 1000)
  }

  return (
    <AuthGuard>
      <section className="min-h-screen flex items-center justify-center bg-white px-4 py-10 sm:py-16">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-indigo-700 mb-2 text-center">
            Contact Us
          </h1>
          <p className="text-gray-500 mb-8 text-center">
            We'd love to hear from you. Fill out the form and our team will get back to you soon.
          </p>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                rows={4}
                placeholder="Your message"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-indigo-600 text-white font-semibold py-2 hover:bg-indigo-700 transition"
            >
              Send Message
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-400">
            Or email us at{' '}
            <a href="mailto:vijaylaxmi38@gmail.com" className="text-indigo-600 underline">
              vijaylaxmi38@gmail.com
            </a>
          </div>
          <div className="mt-4 text-center text-xs text-gray-300">
            NextApp, 123 Main Street, Bengaluru, India · +91 8951276054
          </div>
        </div>
      </section>
    </AuthGuard>
  )
}
