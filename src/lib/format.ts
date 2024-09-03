export const formatPrice = (price: Number) => {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};
