import Image from 'next/image';
import React from 'react';

const HowItWorks = ({ steps }) => (
 <div className="m-2 p-4  rounded-lg">
    <h2 className="text-2xl font-bold mb-4 ">How It Works</h2>
    <div className="w-full flex items-center justify-center relative md:p-4">
      <div className="md:w-[80%] ">

      <Image
        className="w-full object-cover "
        src="/homepage.png"
        layout="responsive"
        width={1000}
        height={1000}
        alt="banner image"
        />
        </div>
    </div>
 </div>
);

export default HowItWorks;