import FormSubmitButton from "@/components/FormSubmitButton";
import { prisma } from "@/lib/db/prisma";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Add product - Corazon",
  description: "Add product to corazon",
};

export default function AddProductPage() {
  const addProduct = async (formData: FormData) => {
    "use server";

    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const imageUrl = formData.get("imageUrl")?.toString();
    const price = Number(formData.get("price") || 0);

    if (!name || !description || !imageUrl || !price) {
      throw Error("Fill up the required field");
    }

    await prisma.product.create({
      data: { name, description, imageUrl, price },
    });

    // redirect("/");
  };

  return (
    <div>
      <h1 className="text-lg mb-3 font-bold">Add product</h1>

      <form action={addProduct}>
        <input
          type="text"
          name="name"
          placeholder="name"
          className="input input-bordered w-full mb-3"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered w-full mb-3"
          required
        />
        <input
          type="url"
          name="imageUrl"
          placeholder="Image URL"
          className="input input-bordered w-full mb-3"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="input input-bordered w-full mb-3"
          required
        />
        {/* <button type="submit" className="btn btn-primary btn-block">
          Add product
        </button> */}
        <FormSubmitButton className=" btn-block">Add product</FormSubmitButton>
      </form>
    </div>
  );
}
