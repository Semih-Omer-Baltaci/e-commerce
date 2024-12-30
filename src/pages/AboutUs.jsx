// eslint-disable-next-line no-unused-vars
import React from 'react';

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">About Dunder Mifflin</h1>
        
        <div className="mb-8">
          <img
            src="https://media.altyazi.net/wp-content/uploads/2022/01/the-office.jpg"
            alt="The Office Cast"
            className="w-full rounded-lg shadow-lg mb-6"
          />
        </div>

        <div className="mb-8">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              className="w-full h-[500px] rounded-lg shadow-lg"
              src="https://www.youtube.com/embed/4iisysmwB_k"
              title="The Office Introduction"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        <div className="prose lg:prose-xl mx-auto">
          <p className="mb-6">
            Welcome to SemihShop, where we treat shopping like Michael Scott treats office parties - with enthusiasm, 
            heart, and maybe a touch of chaos (but the good kind). Founded in the spirit of making online shopping 
            as enjoyable as a day at Dunder Mifflin Scranton branch, we&apos;ve created a platform that puts the &quot;fun&quot; 
            in functional shopping.
          </p>

          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="mb-6">
            Like Dwight&apos;s dedication to beet farming, we&apos;re committed to delivering the best products with unwavering 
            determination. Our journey began with a simple idea: what if shopping online could be as entertaining as 
            watching Jim prank Dwight, but with actual useful results?
          </p>

          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="mb-6">
            Just as Pam brightens up the office with her receptionist skills and artistic talent, we aim to brighten 
            up your shopping experience with a perfect blend of efficiency and creativity. Our mission is simple: 
            &quot;Would an idiot do that?&quot; If you&apos;re asking that about our services, the answer is a definitive no!
          </p>

          <h2 className="text-2xl font-bold mb-4">What Sets Us Apart</h2>
          <p className="mb-6">
            Like Stanley&apos;s dedication to crossword puzzles, we&apos;re focused on getting every detail right. Our customer 
            service is as caring as Phyllis (but less gossipy), our delivery is as reliable as Oscar&apos;s accounting 
            (but more exciting), and our product selection is as diverse as Kevin&apos;s famous chili ingredients 
            (but less likely to spill all over the floor).
          </p>

          <div className="bg-gray-100 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-bold mb-3">That&apos;s What She Said About Us:</h3>
            <blockquote className="italic">
              &quot;SemihShop is like the world&apos;s best boss mug of online shopping - it actually delivers on its promise!&quot;
            </blockquote>
          </div>

          <p className="text-center font-semibold">
            Join us in making online shopping as memorable as a Dundies award ceremony!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
