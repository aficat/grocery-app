export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string; // e.g. 1kg, 325ml
  image: string;
  category: string;
};

export const products: Product[] = [
  {
    id: "bell-pepper-red",
    name: "Bell Pepper Red",
    description:
      "Fresh and crisp red bell peppers great for salads, stir fry, and roasting.",
    price: 4.99,
    unit: "1kg",
    image: "/placeholder.svg",
    category: "Vegetables",
  },
  {
    id: "egg-chicken-red",
    name: "Egg Chicken Red",
    description: "Farm fresh red eggs in a basket.",
    price: 1.99,
    unit: "4pcs",
    image: "/placeholder.svg",
    category: "Dairy",
  },
  {
    id: "organic-bananas",
    name: "Organic Bananas",
    description: "Sweet organic bananas full of potassium.",
    price: 3.0,
    unit: "12kg",
    image: "/placeholder.svg",
    category: "Fruits",
  },
  {
    id: "naturel-red-apple",
    name: "Naturel Red Apple",
    description:
      "Crisp and juicy red apples. Great as a snack or in desserts.",
    price: 4.99,
    unit: "1kg",
    image: "/placeholder.svg",
    category: "Fruits",
  },
  {
    id: "coca-cola-can",
    name: "Coca Cola Can",
    description: "Classic Coca Cola drink.",
    price: 4.99,
    unit: "325ml",
    image: "/placeholder.svg",
    category: "Drinks",
  },
  {
    id: "diet-coke",
    name: "Diet Coke",
    description: "Low-calorie cola drink.",
    price: 1.99,
    unit: "355ml",
    image: "/placeholder.svg",
    category: "Drinks",
  },
  {
    id: "sprite-can",
    name: "Sprite Can",
    description: "Crisp lemon-lime soda.",
    price: 1.5,
    unit: "325ml",
    image: "/placeholder.svg",
    category: "Drinks",
  },
  {
    id: "apple-grape-juice",
    name: "Apple & Grape Juice",
    description: "Refreshing blend of apple and grape.",
    price: 15.5,
    unit: "2L",
    image: "/placeholder.svg",
    category: "Drinks",
  },
];
