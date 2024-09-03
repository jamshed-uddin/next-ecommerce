import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import PriceTag from "./PriceTag";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;

  return (
    <Link href={`/products/${product.id}`}>
      <div className="card bg-base-100 w-full hover:shadow-xl transition-shadow">
        <figure>
          <Image
            src={product.imageUrl}
            alt={`Image of ${product.name}`}
            width={800}
            height={400}
            className="h-48 object-cover "
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {product.name}
            {isNew && <div className="badge badge-secondary">NEW</div>}
          </h2>
          <p>{product.description.slice(0, 100)}...</p>
          <div className="card-actions justify-end">
            <PriceTag price={product.price} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
