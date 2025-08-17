const Owner = require("../models/Owner");

module.exports.createOwner = async ({
  name,
  email,
  password,
  owningVenues,
}) => {
  if (!name || !email || !password) {
    throw new Error("All feilds are required");
  }

  const owner = await Owner.create({
    name,
    email,
    password,
    owningVenues,
  });

  return owner;
};
