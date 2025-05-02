import api from "./index";


export const getLevelsByMatchIdFromAll = async (matchId: number) => {
  try {
    const res = await api.get("/api/level"); // Llama a getALLTeams
    const allLevels = res.data.payload;

    if (!Array.isArray(allLevels)) {
      throw new Error("Formato de datos inesperado.");
    }

    // Filtra los equipos que pertenecen al matchId dado
    const filteredLevels = allLevels.filter(level => level.matchId === matchId);

    return filteredLevels;
  } catch (error) {
    console.error("Error al obtener los niveles por matchId desde getALLLevels:", error);
    throw error;
  }
};