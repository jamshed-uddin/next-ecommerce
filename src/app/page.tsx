import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/db/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <div>
      <div className="hero bg-base-100 rounded-xl">
        <div className="hero-content flex-col lg:flex-row">
          <figure>
            <Image
              src={products[0].imageUrl}
              alt={products[0].name}
              width={400}
              height={800}
              className="w-full max-w-sm rounded-xl"
            />
          </figure>
          <div>
            <h2 className="text-5xl font-semibold">{products[0].name}</h2>
            <p className="py-5">{products[0].description}</p>

            <Link
              href={`/products/${products[0].id}`}
              className="btn btn-primary"
            >
              Check it out
            </Link>
          </div>
        </div>
      </div>

      <div className="my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products?.slice(1).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
