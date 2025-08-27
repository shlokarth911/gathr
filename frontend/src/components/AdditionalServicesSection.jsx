import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const AdditionalServicesSection = ({ topServices }) => {
  return (
    <div className="px-7 py-0 mt-9">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Additional Services</h2>

        <Link className="text-sm flex gap-2 items-center  text-neutral-300">
          See All <ArrowRight size={18} />
        </Link>
      </div>

      <div className="relative mt-5">
        <div className="grid grid-cols-2 gap-2">
          {topServices.map((service, idx) => {
            return (
              <div
                key={idx}
                className="flex   items-center gap-2 px-3 py-3 font-semibold rounded-2xl bg-neutral-600  flex-shrink-0 "
              >
                {/* //icons */}
                {service.icon && <service.icon size={20} />}
                <p className="inline-block text-sm">{service.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdditionalServicesSection;
