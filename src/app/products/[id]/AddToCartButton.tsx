"use client";
import React, { useState, useTransition } from "react";
interface AddToCartButtonProps {
  productId: string;
  incrementProductQuantity: (productId: string) => Promise<void>;
}

const AddToCartButton = ({
  productId,
  incrementProductQuantity,
}: AddToCartButtonProps) => {
  const [pending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  return (
    <div className="flex items-center gap-1">
      <button
        className="btn btn-primary "
        onClick={() => {
          setSuccess(false);
          startTransition(async () => {
            await incrementProductQuantity(productId);
            setSuccess(true);
          });
        }}
      >
        Add to cart
      </button>
      {pending && <span className="loading loading-spinner"></span>}
      {!pending && success && (
        <span className="text-success">Product added to cart</span>
      )}
    </div>
  );
};

export default AddToCartButton;
