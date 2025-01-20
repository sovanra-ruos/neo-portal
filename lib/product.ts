export type Product = {
  name: string;
  price: number;
  image: string;
  categoryName: string;
  description: string;
}

export interface Category {
  uuid: string;
  name: string;
  image: string;
}

export async function getAllProducts(page: number = 1, pageSize: number = 12): Promise<{ products: Product[], totalPages: number }> {
  // Simulating an API call
  await new Promise(resolve => setTimeout(resolve, 1000))

  const allProducts: Product[] = [
    // ... (include all products from the previous function)
    // Add more products to test pagination
  ]

  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedProducts = allProducts.slice(startIndex, endIndex)
  const totalPages = Math.ceil(allProducts.length / pageSize)

  return {
    products: paginatedProducts,
    totalPages
  }
}
