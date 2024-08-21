"use client";
import React, { useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Image } from "primereact/image";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";

const LoginPage = () => {
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL_GREENPULSE}/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=password&username=${email}&password=${password}&scope=&client_id=string&client_secret=string`,
      });
      const data = await response.json();

      if (response.ok) {
        const { access_token, IsAdmin } = data;

        setAuth(access_token, IsAdmin);

        // Redirect based on role
        if (IsAdmin) {
          router.push('/admin');
        } else {
          router.push('/Dashboard');
        }
      } else {
        console.error('Login failed');
        // Handle login failure (e.g., show error message)
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="surface-ground flex item-start md:items-center justify-center min-h-screen min-w-screen overflow-hidden">
      <div className="flex flex-column mt-8 md:mt-0 item-start md:items-center justify-center">
        <div
          className="w-96 md:w-[70svh]"
          style={{
            borderRadius: "56px",
            padding: "0.3rem",
            background:
              "linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 40%)",
          }}
        >
          <div
            className="w-full surface-card py-8 px-5 sm:px-8"
            style={{ borderRadius: "53px" }}
          >
            <div className="mb-5">
              <Image
                src="/sprout.gif"
                alt="Image"
                width="70"
                height="70"
                className="mb-3"
              />
              <div className="text-900 text-3xl font-medium mb-3">
                Welcome, User!
              </div>
              <span className="text-600 font-medium">Sign in to continue</span>
            </div>

            <div>
              <label
                htmlFor="email1"
                className="block text-900 text-xl font-medium mb-2"
              >
                Email
              </label>
              <InputText
                id="email1"
                type="text"
                placeholder="Email address"
                className="w-full md:w-30rem mb-5"
                style={{ padding: "1rem" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label
                htmlFor="password1"
                className="block text-900 font-medium text-xl mb-2"
              >
                Password
              </label>
              <InputText
                id="password1"
                type="password"
                placeholder="Password"
                className="w-full mb-5"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="flex align-items-center justify-content-between mb-5 gap-5">
                <div className="flex align-items-center">
                  <Checkbox
                    inputId="rememberme1"
                    className="mr-2"
                    checked={checked}
                    onChange={(e) => setChecked(e.checked ?? false)}
                  />
                  <label htmlFor="rememberme1">Remember me</label>
                </div>
              </div>
              <Button label="Sign In" className="w-full p-3 text-xl" onClick={handleLogin} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
