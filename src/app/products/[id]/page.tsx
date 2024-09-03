import PriceTag from "@/components/PriceTag";
import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";
import AddToCartButton from "./AddToCartButton";
import { incrementProductQuantity } from "./actions";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) notFound();

  return product;
});

export async function generateMetadata({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id);

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: [{ url: product.imageUrl }],
    },
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await getProduct(id);
  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-4 ">
      <Image
        src={product.imageUrl}
        alt={product.name}
        height={500}
        width={500}
        className="rounded-lg "
        priority
      />

      <div>
        <h1 className="text-5xl font-semibold">{product.name}</h1>

        <PriceTag price={product.price} className="mt-4" />
        <br />

        <AddToCartButton
          productId={id}
          incrementProductQuantity={incrementProductQuantity}
        />
        <p className="my-5">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductPage;
