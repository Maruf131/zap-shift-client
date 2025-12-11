import React from 'react';
import location from '../../../assets/location.png'

const BeMerchant = () => {
    return (
        <div data-aos="zoom-in" className=" lg:p-20 bg-[url(assets/be-a-merchant-bg.png)] bg-no-repeat bg-[#03373D] rounded-2xl mb-16">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img
                    src={location}
                    className="max-w-sm rounded-lg"
                />
                <div>
                    <h1 className="text-5xl font-bold text-white">Merchant and Customer Satisfaction is Our First Priority</h1>
                    <p className="py-6 text-gray-300">
                        We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                    </p>
                    <button className="btn bg-primary text-black font-extrabold rounded-full">Become a Merchant</button>
                    <button className="btn btn-outline text-primary border-primary-color font-extrabold rounded-full ml-2">Earn with ZapShift Courier</button>
                </div>
            </div>
        </div>
    );
};

export default BeMerchant;