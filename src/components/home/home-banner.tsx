import Image from "next/image";
import React from "react";

export default function Homebanner() {
  const imaged = [
    {
      id: 1,
      text: "These Are the Best Amazon Kitchen Deals to Kick-Start the New Year",
      image:
        "https://www.allrecipes.com/thmb/6MZFExL-Rxms-GTy9SGsfcqpOYw=/144x95/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/ar-amazon-new-year-sales-tout-f7d89879460a44cb8e40235a314d503c.jpg",
    },
    {
      id: 2,
      text: "Aldi sign on a purple, yellow and red patterned background ",
      image:
        "https://www.allrecipes.com/thmb/u1jjUhnNiV73YyVRmEocvTEuSiE=/144x95/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/ar-aldi-batch-getty-4-4x3-ae63aca186ac4e6f8ee0d5207e2b284a.jpg",
    },
    {
      id: 3,
      text: "Goldfish Has 5 New Snacks Coming to Shelves in January",
      image:
        "https://www.allrecipes.com/thmb/sGVc0ZsEz5JMAjTbNnMD6_X5dpY=/144x95/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/ar-goldfish-pepperidge-farm-4x3-f900319887ad4c6482679bc90b8f9fb1.jpg",
    },
    {
      id: 4,
      text: `Our Most Popular New Casserole of 2024 Is "Dangerously Deli"`,
      image:
        "https://www.allrecipes.com/thmb/yBxGTyZhY6PtQq9L0rDlviwG_gE=/144x95/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/8710394-Million-Dollar-Potato-Casserole-ddmfs-0194-4x3-beauty-9f91b56e603144eaa1081a987b9116c2.jpg",
    },
  ];

  return (
    <div className="flex p-8 gap-3 w-full">
      <div className="w-2/3">
        <Image
          src={"/images/home-banner-image.jpg"}
          alt=""
          width={800}
          height={0}
        />
      </div>
      <div className=" bg-[#F5F6EA] w-1/3 text-center p-4">
        <h1 className="text-2xl font-extrabold">Latest & Trending</h1>
        <div className="p-7">
          {imaged.map((image) => (
            <div
              className="flex items-center text-start gap-7 p-1"
              key={image.id}
            >
              <Image
                src={image.image}
                alt={image.text}
                width={130}
                height={0}
              />
              <h1 className="text-sm">{image.text}</h1>
            </div>
          ))}
          <div></div>
        </div>
      </div>
    </div>
  );
}
