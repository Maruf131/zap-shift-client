// src/components/HowItWorksCard.jsx
const HowItWorksCard = ({ step}) => {
    const {icon, title, description} = step;
  return (
    <div className="bg-gray-100 shadow-lg rounded-2xl p-6 flex flex-col gap-3 transition hover:shadow-xl">
      <img src={icon} alt={title} className="w-12 h-12" />

      <h3 className="text-lg font-semibold text-primary">
        {title}
      </h3>

      <p className="text-sm text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default HowItWorksCard;
