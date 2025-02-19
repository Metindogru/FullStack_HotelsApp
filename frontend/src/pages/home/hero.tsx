import { FC } from "react";

const Hero: FC = () => {
  return (
    <div className="hero h-[20vh] md:h-[30vh] grid place-items-center rounded-3xl p-5 bg-center bg-cover mb-10">
      <div className="text-white text-center">
        <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-5">
          TripStar ile konaklama rezervasyonu yap
        </h1>
        <p className="md:text-lg lg:text-xl">
          Dünya çapında <b>1,785.090</b> oda seni bekliyor!
        </p>
      </div>
    </div>
  );
};

export default Hero;
