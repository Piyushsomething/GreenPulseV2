"use client";
import React from "react";
import useAuthStore from "@/store/authStore";
import Component1 from "@/components/DashboardComponents/Component1";
import Component2 from "@/components/DashboardComponents/Component2";
import Component3 from "@/components/DashboardComponents/Component3";
import VideoBackground from "@/components/HomePage/VideoBackground";

const DashboardPage = () => {
  const { validUser } = useAuthStore();
  console.log(validUser);

  return (
    <div className="h-screen">
      <div className=" flex flex-col p-4 md:pt-4 gap-4 ">
        <div className="flex flex-1 flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/4 ">
            <Component1 />
          </div>
          <div className="w-full md:w-2/4 ">
            <Component2 />
          </div>
          <div className="w-full md:w-1/4 ">
            <Component3 />
          </div>
        </div>
        {/* <VideoBackground src="/video/drone.webm" /> */}
      </div>
      
    </div>
  );
};

export default DashboardPage;
