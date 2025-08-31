import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const AdditionalServicesSection = ({ topServices }) => {
  return (
    <div className="px-7 mt-9">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Additional Services</h2>
        <Link className="text-sm flex gap-2 items-center text-neutral-400 hover:text-white transition-colors">
          See All <ArrowRight size={18} />
        </Link>
      </div>

      {/* Services Grid */}
      <div className="relative mt-5">
        <div className="grid grid-cols-2 gap-3">
          {topServices.map((service, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-3 py-3 rounded-2xl 
                         bg-neutral-700/70 backdrop-blur-md shadow-md shadow-black/20 
                         hover:scale-[1.02] transition-transform duration-200"
            >
              {/* Icon with subtle bubble */}
              <div className="p-2 rounded-lg bg-[#43ff1d15]">
                {service.icon && (
                  <service.icon size={20} className="text-[#43ff1d]" />
                )}
              </div>
              <p className="text-sm font-medium">{service.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdditionalServicesSection;
