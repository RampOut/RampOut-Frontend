import api from "./index";


export const getTeamsByMatchIdFromAll = async (matchId: number) => {
  try {
    const res = await api.get("/api/team"); // Llama a getALLTeams
    const allTeams = res.data.payload;

    if (!Array.isArray(allTeams)) {
      throw new Error("Formato de datos inesperado.");
    }

    // Filtra los equipos que pertenecen al matchId dado
    const filteredTeams = allTeams.filter(team => team.matchId === matchId);

    return filteredTeams;
  } catch (error) {
    console.error("Error al obtener los equipos por matchId desde getALLTeams:", error);
    throw error;
  }
};