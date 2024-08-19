"use client";
import React, { useState } from "react";
import axios from "axios";

import { useRouter } from "next/navigation";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const SignupForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    full_name: "",
    password: "",
    adhaar_no: "",
    photo: null,
    adhaar_photo: null,
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.full_name) newErrors.full_name = "Full name is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.adhaar_no) newErrors.adhaar_no = "Adhaar number is required";
    if (!/^\d{12}$/.test(formData.adhaar_no))
      newErrors.adhaar_no = "Adhaar number must be 12 digits";
    if (!formData.photo) newErrors.photo = "Photo is required";
    if (!formData.adhaar_photo) newErrors.adhaar_photo = "Adhaar photo is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const data = new FormData();
        data.append("photo", formData.photo);
        data.append("adhaar_photo", formData.adhaar_photo);
  
        const queryParams = new URLSearchParams({
          username: formData.username,
          adhaar_no: formData.adhaar_no,
          password: formData.password,
          email: formData.email,
          full_name: formData.full_name,
        }).toString();
  
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL_GREENPULSE}/signup?${queryParams}`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        setSuccessMessage("User registered successfully!");
        setFormData({
          username: "",
          email: "",
          full_name: "",
          password: "",
          adhaar_no: "",
          photo: null,
          adhaar_photo: null,
        });
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } catch (error) {
        if (error.response && error.response.data) {
          const apiError = Array.isArray(error.response.data.detail)
            ? error.response.data.detail.map((err) => err.msg).join(", ")
            : error.response.data.detail;
          setErrors({ api: apiError });
        } else {
          setErrors({ api: "An error occurred. Please try again." });
        }
      }
    }
  };
  
  

  return (
    <>
    <div className="mx-auto mt-8 max-w-md">
      <form
        onSubmit={handleSubmit}
        className="mb-4 rounded  px-8 pb-8 pt-6 shadow-md"
      >
        <h2 className="mb-6 text-center text-2xl font-bold">Sign Up</h2>
        {successMessage && (
          <div
            className="relative mb-4 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700"
            role="alert"
            >
            <span className="block sm:inline">{successMessage}</span>
          </div>
        )}
        {errors.api && (
          <div
          className="relative mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
          role="alert"
          >
            <span className="block sm:inline">{errors.api}</span>
          </div>
        )}
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold "
            htmlFor="username"
            >
            Username
          </label>
          <InputText
            className={`focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight  shadow focus:outline-none ${
              errors.username ? "border-red-500" : ""
            }`}
            id="username"
            // type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            />
          {errors.username && (
            <p className="text-xs italic text-red-500">{errors.username}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold "
            htmlFor="email"
            >
            Email
          </label>
          <InputText
            className={`focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight  shadow focus:outline-none ${
              errors.email ? "border-red-500" : ""
            }`}
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            />
          {errors.email && (
            <p className="text-xs italic text-red-500">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold "
            htmlFor="full_name"
            >
            Full Name
          </label>
          <InputText
            className={`focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight  shadow focus:outline-none ${
              errors.full_name ? "border-red-500" : ""
            }`}
            id="full_name"
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            placeholder="Full Name"
            />
          {errors.full_name && (
            <p className="text-xs italic text-red-500">{errors.full_name}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold "
            htmlFor="password"
            >
            Password
          </label>
          <InputText
            className={`focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight  shadow focus:outline-none ${
              errors.password ? "border-red-500" : ""
            }`}
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            />
          {errors.password && (
            <p className="text-xs italic text-red-500">{errors.password}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold "
            htmlFor="adhaar_no"
            >
            Adhaar Number
          </label>
          <InputText
            className={`focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight  shadow focus:outline-none ${
              errors.adhaar_no ? "border-red-500" : ""
            }`}
            id="adhaar_no"
            type="number"
            name="adhaar_no"
            value={formData.adhaar_no}
            onChange={handleChange}
            placeholder="Adhaar Number"
            />
          {errors.adhaar_no && (
            <p className="text-xs italic text-red-500">{errors.adhaar_no}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold "
            htmlFor="photo"
            >
            Photo
          </label>
          <InputText
            className={`focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight  shadow focus:outline-none ${
              errors.photo ? "border-red-500" : ""
            }`}
            id="photo"
            type="file"
            name="photo"
            onChange={handleChange}
            />
          {errors.photo && (
            <p className="text-xs italic text-red-500">{errors.photo}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold "
            htmlFor="adhaar_photo"
            >
            Adhaar Photo
          </label>
          <InputText
            className={`focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight  shadow focus:outline-none ${
              errors.adhaar_photo ? "border-red-500" : ""
            }`}
            id="adhaar_photo"
            type="file"
            name="adhaar_photo"
            onChange={handleChange}
            />
          {errors.adhaar_photo && (
            <p className="text-xs italic text-red-500">{errors.adhaar_photo}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <Button
            type="submit"
            >
            Sign Up
          </Button>
        </div>
      </form>
    </div>
            </>
  );
};

export default SignupForm;
