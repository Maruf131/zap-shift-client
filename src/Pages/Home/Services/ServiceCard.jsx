// src/components/ServiceCard.jsx

const ServiceCard = ({service}) => {
    const {icon:Icon, title, description} = service;
  return (
    <div className="p-6 bg-base-100 shadow-lg rounded-xl border hover:bg-amber-50 hover:text-warning transition-all duration-300">
      <div className="text-[#CAEB66] text-4xl mb-4">
        <Icon />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-base text-gray-600">{description}</p>
    </div>
  );
};

export default ServiceCard;
