
import Marquee from 'react-fast-marquee'
import amazon from '../../../assets/brands/amazon.png'
import amazon_vector from '../../../assets/brands/amazon_vector.png'
import casio from '../../../assets/brands/casio.png'
import moonstar from '../../../assets/brands/moonstar.png'
import randstad from '../../../assets/brands/randstad.png'
import star from '../../../assets/brands/star.png'

const logos = [amazon, amazon_vector, casio, moonstar, randstad, star]

const ClientLogoMarquee = () => {
  return (
    <section className="py-16 px-2">
      {/* Section Title */}
      <div className="text-center mb-10 px-2">
        <h2 className="text-3xl font-bold mb-2">
          We've helped thousands of <span className="text-primary">sales teams</span>
        </h2>
        <p className="text-gray-600 text-lg">
          Trusted by top companies who rely on our service every day.
        </p>
      </div>

      {/* Marquee Logo Slider */}
      <Marquee
        behavior="scroll"
        direction="left"
        scrollamount="6"  // speed
        className="py-4"
      >
        <div className="flex gap-12 items-center">
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt="client logo"
              className="h-6 mx-8 object-contain opacity-100 transition"
            />
          ))}
        </div>
      </Marquee>
    </section>
  );
};

export default ClientLogoMarquee;
