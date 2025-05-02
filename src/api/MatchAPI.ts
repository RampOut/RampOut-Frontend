import api from "./index";
import { Match } from "my-types";

export const createMatch = async (host: Match) => {
  try {
    const res = await api.post("api/match", {
      hostId: host.hostId,
      teams: host.teams,
      players: host.players,
      levels: host.levels,
    });
  } catch (e) {
    console.log("Error al crear la partida: ", e);
  }
};