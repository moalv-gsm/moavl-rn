import { searchClient } from "./algoliaConfig";

// Función de búsqueda
export const searchAlgoliaMoalv = async (index: string, query: string) => {
  if (!query) return [];
  try {
    const results: any = await searchClient.search({
      requests: [
        {
          indexName: index, // Reemplaza con el nombre de tu índice
          query,
        },
      ],
    });

    // Retorna directamente los hits (resultados)

    return results.results[0].hits;
  } catch (error) {
    console.error("Error en búsqueda de Algolia:", error);
    throw error;
  }
};
