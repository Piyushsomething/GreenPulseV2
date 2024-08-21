"use client";
import React, { useEffect, useState } from "react";
import { Toolbar } from "primereact/toolbar";
import Image from "next/image";
import Link from "next/link";
import { Button } from "primereact/button";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { validUser, isAdmin, resetAuth } = useAuthStore();
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleSignOut = () => {
    resetAuth();
    router.push('/');
  };
  if (!hasMounted) {
    return null; // or return a loading spinner, or only return part of the component
  }

  const endContent = validUser ? (
    <div className="flex gap-4">
      {isAdmin ? (
        <Link href="/admin">
          <Button link className="p-button-text transition-colors">
            Admin Panel
          </Button>
        </Link>
      ) : (
        <>
        <Link href="/Dashboard">
          <Button link className="p-button-text transition-colors">
            Dashboard
          </Button>
        </Link>
        <Link href="/status">
          <Button link className="p-button-text transition-colors">
            Status
          </Button>
        </Link>
        </>
      )}
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
          <Link href="/">
            <Button className="text-5xl">GREENPULSE</Button>
          </Link>
        }
        end={endContent}
        className="bg-transparent surface-0 shadow-2 border rounded-full"
        style={{ borderRadius: "3rem" }}
      />
    </div>
  );
}
