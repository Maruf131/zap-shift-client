const BenefitCard = ({ item }) => {
    const {title, description, image} = item; 
    return (
        <div className=" bg-gray-100 border-2 rounded-xl shadow-sm p-6 flex flex-col lg:flex-row items-center gap-6">

            {/* Left Image */}
            <div className="w-full lg:w-1/3 flex justify-center">
                <img
                    src={image}
                    className="w-40 h-auto object-contain"
                />
            </div>

            {/* Middle Divider */}
            <div className="hidden lg:block h-32 border-r border-dashed border-gray-300"></div>

            {/* Right Text */}
            <div className="w-full lg:w-2/3">
                <h3 className="text-2xl text-[#CAEB66] font-semibold mb-2">
                    {title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                    {description}
                </p>
            </div>

        </div>
    );
};

export default BenefitCard;
