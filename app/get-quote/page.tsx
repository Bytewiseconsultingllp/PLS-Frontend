"use client"

import { useForm } from "react-hook-form"
import Loader from "@/components/ui/loader"
import { zodResolver } from "@hookform/resolvers/zod"
import { getQuoteSchema, type FormData } from "@/validation/schema"
import { axios } from "@/config/axios"
import { useMessage } from "@/hooks/useMessage"
import { useLoading } from "@/hooks/useLoading"
import { useState } from "react"
import { toast } from 'react-toastify';

export default function GetQuotePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(getQuoteSchema),
  })

  const { errorMessage } = useMessage()
  const { startLoading, stopLoading, isLoading } = useLoading()
  const [ loading, setLoading ] = useState(false) 

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    // alert("Form submission started!") // 🧪 Remove after debugging
    // console.log("Submitting data:", data)

    try {
      startLoading()
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}getQuotes/createQuote`, data)
      console.log("Response received:", res.data)

      toast.success('Quote submitted successfully!');

      // reset() 
      window.location.reload()
      console.log("Form has been reset")
    } catch (error: any) {
      
      toast.error('Something went wrong.'); 
      setLoading(false)   
      // window.location.reload()
      console.error("Submission error:", error.response?.data || error.message)
      errorMessage("Something went wrong while submitting quote")
    } finally {
      stopLoading()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Get a Quote</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003087] text-black ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003087] text-black ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              id="phone"
              type="number"
              {...register("phone")}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003087] text-black ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>}
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              id="address"
              {...register("address")}
              rows={3}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003087] text-black ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address.message}</p>}
          </div>

          {/* Services Required */}
          <div>
            <label htmlFor="services" className="block text-sm font-medium text-gray-700">
              Services Required
            </label>
            <input
              id="services"
              type="text"
              {...register("services")}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003087] text-black ${
                errors.services ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.services && <p className="text-sm text-red-500 mt-1">{errors.services.message}</p>}
          </div>

          {/* Company (Optional) */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700">
              Company (Optional)
            </label>
            <input
              id="company"
              type="text"
              {...register("company")}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003087] text-black ${
                errors.company ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.company && <p className="text-sm text-red-500 mt-1">{errors.company.message}</p>}
          </div>

          {/* Additional Details (Optional) */}
          <div>
            <label htmlFor="detail" className="block text-sm font-medium text-gray-700">
              Additional Details (Optional)
            </label>
            <textarea
              id="detail"
              {...register("detail")}
              rows={4}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003087] text-black ${
                errors.detail ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.detail && <p className="text-sm text-red-500 mt-1">{errors.detail.message}</p>}
          </div>

          {/* Deadline (Optional) */}
          <div>
            <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
              Deadline (Optional)
            </label>
            <input
              id="deadline"
              type="date"
              {...register("deadline")}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003087] text-black ${
                errors.deadline ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.deadline && <p className="text-sm text-red-500 mt-1">{errors.deadline.message}</p>}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-[#003366] flex items-center justify-center text-white py-3 px-4 rounded-md hover:bg-[#003366]/70 transition duration-300"
            >
              {/* {isLoading ? <Loader /> : <span>Submit Quote</span>} */}
              {loading ? (
                <span>Submiting...</span>
              ) : (
                <span>Submit Quote</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
