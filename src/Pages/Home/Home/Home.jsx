import React from 'react';
import Banner from '../Banner/Banner';
import ServicesSection from '../Services/ServiceSection';
import ClientLogoMarquee from '../ClientLogoMarquee/ClientLogoMarquee';
import BenefitsSection from '../Benefits/BenefitsSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <ServicesSection></ServicesSection>
            <ClientLogoMarquee></ClientLogoMarquee>
            <BenefitsSection></BenefitsSection>
        </div>
    );
};

export default Home;
