import { api } from "./api";
import { Fruit } from "./types";

// Fetch all fruits with images
export const fetchFruits = async (): Promise<Fruit[]> => {
  const res = await api.get("/fruits/en");
  return res.data.filter((f: Fruit) => f.filename && f.filename.length > 0);
};
