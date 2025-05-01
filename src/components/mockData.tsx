// src/mockdata/profesoresData.ts

import { Profesor } from "my-types";

// Mock data para la lista de profesores
export const mockProfesores: Profesor[] = [
  {
    id: 1,
    username: "L00123456",
    password: "password123",
    role: "admin",
  },
  {
    id: 2,
    username: "L00234567",
    password: "password456",
    role: "user",
  },
  {
    id: 3,
    username: "L00345678",
    password: "password789",
    role: "user",
  },
  {
    id: 4,
    username: "L00456789",
    password: "password012",
    role: "admin",
  },
  {
    id: 5,
    username: "L00567890",
    password: "password345",
    role: "user",
  },
  {
    id: 6,
    username: "L00678901",
    password: "password678",    
    role: "user",
  },
  {
    id: 7,
    username: "L00789012",
    password: "password 901",
    role: "user",
  },
  {
    id: 8,
    username: "L00890123",
    password: "password234",
    role: "admin",
  },
  {
    id: 9,
    username: "L00901234",
    password: "password567",
    role: "user",
  },
  {
    id: 10,
    username: "L00012345",
    password: "password890",
    role: "user",
  }
];

// Mock API functions
export const mockGetAllHosts = (): Promise<Profesor[]> => {
  return Promise.resolve(mockProfesores);
};

export const mockDeleteHost = (id: number): Promise<void> => {
  console.log(`Deleted professor with ID: ${id}`);
  return Promise.resolve();
};

export const mockUpdateHost = (id: number, newPassword: string, newRole: string): Promise<void> => {
  console.log(`Updated professor with ID: ${id}`);
  console.log(`New password: ${newPassword ? '********' : 'unchanged'}`);
  console.log(`New role: ${newRole}`);
  return Promise.resolve();
};

export const mockLogOut = (): Promise<void> => {
  console.log('User logged out');
  return Promise.resolve();
};