import React from 'react';
import Banner from '../Banner/Banner';
import ServicesSection from '../Services/ServiceSection';
import ClientLogoMarquee from '../ClientLogoMarquee/ClientLogoMarquee';
import BenefitsSection from '../Benefits/BenefitsSection';
import BeMerchant from '../BeMerchant/BeMerchant';
import HowItWorks from '../HowItWorks/HowItWorks';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <ServicesSection></ServicesSection>
            <ClientLogoMarquee></ClientLogoMarquee>
            <BenefitsSection></BenefitsSection>
            <BeMerchant></BeMerchant>
        </div>
    );
};

export default Home;
