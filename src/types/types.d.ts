declare module "my-types"{
    export interface Profesor{
        id: number;
        username: string;
        password?: string;
        role:string;
    }

    export interface AuthResponse {
        body: {
            token: string;
        }
    }}
