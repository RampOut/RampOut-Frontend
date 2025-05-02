import api from "./index";
import { Match } from "my-types";

export const createMatch = async (host: Match) => {
  
  try {
    const res = await api.post("api/match", {
      hostId: host.hostId,
      teams: host.teams,
      levels: host.levels,
      status: "Started"
    });
  } catch (e) {
    console.log("Error al crear la partida: ", e);
  }
};



export const getMatchById = async (matchId: number) => {
  try {
    const res = await api.get(`/api/match/${matchId}`);
    
    // Desestructura el payload
    const { id, status, hostId, teams, levels } = res.data.payload;

    // Ahora puedes usar las variables individualmente
    console.log(id, status,  hostId, teams, levels);

    // O retornar lo que necesites
    return { id, hostId, teams, levels };
  } catch (e) {
    console.log("Error al Encontrar la partida: ", e);
  }
};


export const getLastMatchId = async (): Promise<number | null> => {
  try {
    const res = await api.get("/api/match"); // Asegúrate que el endpoint es correcto

    const matches = res.data.payload;

    if (!Array.isArray(matches) || matches.length === 0) {
      console.log("No se encontraron partidas");
      return null;
    }

    // Ordena por id descendente y toma la primera
    const lastMatch = matches.sort((a, b) => b.id - a.id)[0];

    return lastMatch.id;
  } catch (e) {
    console.log("Error al obtener la última partida: ", e);
    return null;
  }
};





/*
export const getMatch = async (matchId: number) => {
  try {
    const res = await api.get(`/api/match/${matchId}`);
    return res.data;
  } catch (e) {
    console.log("Error al Encontrar la partida: ", e);
  }
};*/