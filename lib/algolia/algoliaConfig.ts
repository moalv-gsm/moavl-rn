// lib/algolia.ts
import { algoliasearch } from "algoliasearch";

// Inicializa el cliente con tus credenciales
export const searchClient = algoliasearch(
  "LIW5J9TVLB", // Reemplaza con tu Application ID
  "a62f95774f4de78c54ece3691b495ba6" // Reemplaza con tu Search-Only API Key
);
