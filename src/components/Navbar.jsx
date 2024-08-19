"use client";
import React from "react";
import { Toolbar } from "primereact/toolbar";
import Image from "next/image";
import Link from "next/link";
import { Button } from "primereact/button";
import Cookies from 'js-cookie'; // Import js-cookie
import useAuthStore from "@/store/authStore";

export default function Navbar() {
  const { validUser, resetStore } = useAuthStore();

  const handleSignOut = () => {
    Cookies.remove('access_token_login', { path: '/' });
    Cookies.remove('IsAdmin', { path: '/' });
    resetStore();
  };

  const endContent = validUser ? (
    <div className="flex gap-4">
      <Link href="/Dashboard">
        <Button link className="p-button-text transition-colors">
          Dashboard
        </Button>
      </Link>
      <Button label="Sign Out" className="p-button-text transition-colors" onClick={handleSignOut} />
    </div>
  ) : (
    <div className="flex gap-4">
      <Link href="/">
        <Button link className="p-button-text transition-colors">
          Home
        </Button>
      </Link>
      <Link href="/login">
        <Button link className="p-button-text transition-colors">
          Login
        </Button>
      </Link>
      <Link href="/signup">
        <Button link className="p-button-text transition-colors">
          Signup
        </Button>
      </Link>
    </div>
  );

  return (
    <div className="card">
      <Toolbar
        start={
          <Link href="/">
            <Image
              src="/organic.gif"
              className="rounded-full"
              width={60}
              height={60}
              alt="logo"
            />
          </Link>
        }
        center={
          <div className="">
            <div className="text-5xl font-bold text-white">GREENPULSE</div>
          </div>
        }
        end={endContent}
        className="bg-transparent surface-0 shadow-2 border rounded-full"
        style={{ borderRadius: "3rem" }}
      />
    </div>
  );
}
