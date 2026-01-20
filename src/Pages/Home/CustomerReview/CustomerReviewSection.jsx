
import React, { useState } from "react";
import CustomerReviewCard from "./CustomerReviewCard";
import customer from '../../../assets/customer-top.png';
import review from '../../../assets/reviewQuote.png'

const CustomerReviewSection = () => {
    const [index, setIndex] = useState(0);

    const next = () => setIndex((index + 1) % reviews.length);
    const prev = () => setIndex((index - 1 + reviews.length) % reviews.length);

    // src/data/reviewsData.js

    const reviews = [
        {
            id: 1,
            icon: review,
            description:
                "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine.",
            name: "Awlad Hossin",
            title: "Senior Product Designer",
        },
        {
            id: 2,
            icon: review,
            description:
                "Helps you maintain proper alignment effortlessly throughout daily activities.",
            name: "Rasel Ahamed",
            title: "CTO",
        },
        {
            id: 3,
            icon: review,
            description:
                "Reduces muscle tension and encourages improved posture gradually.",
            name: "Nasir Uddin",
            title: "CEO",
        },
        {
            id: 4,
            icon: review,
            description:
                "Comfortable design ensures long-term usage without discomfort.",
            name: "Habib Rahman",
            title: "Manager",
        },
        {
            id: 5,
            icon: review,
            description:
                "Supports your spine and helps reduce daily back pain effectively.",
            name: "Sakib Hasan",
            title: "Developer",
        },
        {
            id: 6,
            icon: review,
            description:
                "Lightweight and easy to wear under clothing for long hours.",
            name: "Aminul Islam",
            title: "Designer",
        },
        {
            id: 7,
            icon: review,
            description:
                "Perfect for improving posture during desk work.",
            name: "Sharmin Akter",
            title: "Entrepreneur",
        },
        {
            id: 8,
            icon: review,
            description:
                "Improves balance and helps reduce muscle pressure.",
            name: "Niloy Sarker",
            title: "Trainer",
        },
        {
            id: 9,
            icon: review,
            description:
                "Soft material ensures comfort even after long wear.",
            name: "Tania Alam",
            title: "Consultant",
        },
        {
            id: 10,
            icon: review,
            description:
                "Regular usage helps maintain natural posture all day long.",
            name: "Imran Hossain",
            title: "Product Lead",
        },
    ];


    return (
        <section className="py-20 mx-2 mb-18 bg-gray-100 rounded-3xl">
            <div className="container mx-auto text-center px-2">

                {/* TOP IMAGE */} 
                <img
                    src={customer}
                    alt="section icon"
                    className="mx-auto mb-6 w-40"
                />

                {/* TITLE */}
                <h2 className="text-3xl md:text-4xl text-black font-bold mb-4">
                    What our customers are saying
                </h2>

                {/* DESCRIPTION */}
                <p className="text-gray-600 max-w-2xl mx-auto mb-12">
                    Real feedback from our valuable customers who experienced comfort,
                    proper alignment, reduced pain, and improved posture every day.
                </p>

                {/* SLIDER */}
                <div className="relative flex justify-center items-center px-4">

                    {/* Prev Button */}
                    <button
                        onClick={prev}
                        className="absolute left-0 bg-primary shadow-md w-10 h-10 z-10 rounded-full flex items-center justify-center hover:bg-lime-300"
                    >
                        ← 
                    </button>

                    {/* Active Card */}
                    <CustomerReviewCard item={reviews[index]} active={true} />

                    {/* Next Button */}
                    <button
                        onClick={next}
                        className="absolute right-0 bg-primary shadow-md w-10 h-10 rounded-full flex items-center justify-center hover:bg-lime-300"
                    >
                        →
                    </button>
                </div>

                {/* Dots */}
                <div className="flex justify-center gap-2 mt-6">
                    {reviews.map((t, i) => (
                        <button
                            key={t.id}
                            onClick={() => setIndex(i)}
                            className={`w-3 h-3 rounded-full ${index === i ? "bg-teal-800" : "bg-gray-300"
                                }`}
                        ></button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CustomerReviewSection;
