import CreateProductFab from "./products/create-product/create-product-fab";
import Products from "./products/products";
// import Users from "./users/users";

interface HomeProps {
  searchParams: Promise<{ search?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { search } = await searchParams;

  return (
    <>
      {/* <Users /> */}
      <Products search={search} />
      <CreateProductFab />
    </>
)}

 
