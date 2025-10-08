'use server'

import axios from 'axios'

export interface Product {
  code: string
  product_name: string
  image_url: string
  nutriments: {
    energy: number
  }
}

// Fonction serveur pour récupérer les produits
export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await axios.get('https://world.openfoodfacts.org/api/v2/search', {
      params: {
        code: '3263859883713,8437011606013,6111069000451',
        fields: 'code,product_name,image_url,nutriments.energy',
      },
    })

    // L'API renvoie un objet avec la clé "products"
    return res.data.products as Product[]
  } catch (error) {
    console.error('Erreur lors du fetch OpenFoodFacts :', error)
    throw new Error('Impossible de récupérer les produits')
  }
}
