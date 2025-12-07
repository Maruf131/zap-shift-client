import BenefitCard from "./BenefitsCard";
import tracking from '../../../assets/benefits/tracking.png';
import call from '../../../assets/benefits/call.png';
import support from '../../../assets/benefits/support.png';

const BenefitsSection = () => {
    const benefits = [
        {
            id: 1,
            title: "Live Parcel Tracking",
            description:
                "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment’s journey and get instant status updates.",
            image: tracking,
        },
        {
            id: 2,
            title: "100% Safe Delivery",
            description:
                "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
            image: call,
        },
        {
            id: 3,
            title: "24/7 Call Center Support",
            description:
                "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
            image: support,
        },
    ]
    return (
        <section className="py-16">
            <div className="max-w-6xl mx-auto px-4 space-y-8">

                {benefits.map((item) => (
                    <BenefitCard
                        key={item.id}
                        item={item}
                    />
                ))}

            </div>
        </section>
    );
};

export default BenefitsSection;
