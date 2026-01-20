import HowItWorksCard from "./HowItWorksCard";
import vector from '../../../assets/Vector.png';

const HowItWorks = () => {
    const steps = [
        {
            icon: vector,
            title: "Booking Pick & Drop",
            description:
                "From personal packages to business shipments — we deliver on time, every time."
        },
        {
            icon: vector,
            title: "Live Parcel Tracking",
            description:
                "Track your parcel in real-time and get instant updates for full peace of mind."
        },
        {
            icon: vector,
            title: "Secure Handling",
            description:
                "Your parcels are handled with care using modern safety standards."
        },
        {
            icon: vector,
            title: "Fast Delivery",
            description:
                "Experience timely delivery with our efficient logistics system."
        }
    ];

    return (
        <section className="py-12 mx-2">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold mb-8">
                    How it Works
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step, index) => (
                        <HowItWorksCard
                            key={index}
                            step={step}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
