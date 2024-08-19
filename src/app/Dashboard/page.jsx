"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import Cookies from 'js-cookie';

const DashboardPage = () => {
  const router = useRouter();
  const { validUser } = useAuthStore();
  const token = Cookies.get('access_token_login');

  useEffect(() => {
    console.log('Valid User:', validUser);
    console.log('Token:', token);

    if (!validUser || !token) {
      router.push('/login');
    }
  }, [validUser, token, router]);

  return <div>Dashboard Content</div>;
};

export default DashboardPage;
