declare module "my-types" {
    export interface Profesor{
        id: number;
        username: string;
        password: string;
        role:string;
    }

    export interface AuthResponse {
        body: {
            token: string;
        }
    }

    export interface Team {
        tempId: number,
        name: string | null,
        scoreTotal: number,
        scorePerRound: number[],
    }

    export interface Player {
        matricula: string,
        teamTempId: number,
    }

    export interface Level {
        levelVariables: number[],
        clue: string,
    }

    export interface Match {
        hostId: number;
        teams: Team[];
        //players: Player[];
        levels: Level[];
    }
}