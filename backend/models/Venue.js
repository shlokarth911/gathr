const mongoose = require("mongoose");
const { Schema } = mongoose;

const packageSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      default: "",
    },
    price: {
      type: Number,
      required: true,
    },
    priceUnit: {
      type: String,
      enum: ["hour", "event", "person"],
      default: "event",
    },
    minGuests: {
      type: Number,
      default: 0,
    },
    maxGuests: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const availabilitySlotSchema = new Schema(
  {
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["booked", "hold", "blocked"],
      default: "booked",
    },
  },
  { _id: false }
);

const venueSchema = new Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },

    //address
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      index: true,
    },
    postalCode: {
      type: String,
      default: "",
    },

    //geo-location
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], default: [0, 0] },
    },

    //capacity and pricing
    capacityMin: {
      type: Number,
      default: 1,
    },
    capacityMax: {
      type: Number,
      default: 100,
    },
    basePrice: {
      type: Number,
      default: 0,
    },
    priceUnit: {
      type: String,
      enum: ["hour", "event", "person"],
      default: "event",
    },

    // packaged offers
    packages: {
      type: [packageSchema],
      default: [],
    },

    // amenities & facilities
    amenities: {
      type: [String],
      default: [],
    }, // e.g., ['AC','Parking','Stage','Projector']

    // catering availability flag (link to caterer records later)
    cateringAvailable: {
      type: Boolean,
      default: false,
    },

    //media + contact
    images: {
      type: [String],
      default: [],
    },
    contactPhone: {
      type: String,
      default: "",
    },
    constactEmail: {
      type: String,
      default: "",
    },

    // operational
    avgResponseTimeHours: {
      type: Number,
      default: 24,
    }, // helpful to show "usually replies in X hrs"
    ratingAvg: {
      type: Number,
      default: 0,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },

    // booking/availability bookkeeping (simple): array of booked or held slots
    bookedSlots: {
      type: [availabilitySlotSchema],
      default: [],
    },

    // flags
    isPublished: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Create 2dsphere index for geo queries
venueSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Venue", venueSchema);
