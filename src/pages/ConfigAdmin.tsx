import { Profesor } from "my-types";
import { useState, useEffect } from "react";
import Filter from "../components/Filter";
import ProList from "../components/ProList";
import { getAllHosts } from "../api/ProfesorAPI";

interface Props {}

const ConfigAdmin = (_props: Props) => {
  //Filtro
  const [name, setName] = useState<string>("");
  const[category,setCategory] = useState<string>("All")

  // Estado del componente.
  const [profesor, setProfesor] = useState<Profesor[]>([]);

  //Se podria poner que se cambie la categoria y filtre por rol
  const filteredPros = profesor.filter((profesor) => {
    return (
      (category === "All" || profesor.role === category) && profesor.username &&
      profesor.username.toLowerCase().includes(name.toLowerCase())
      //man de manzana
    );
  });

  // Eventos del componente
  useEffect(() => {
    getAllHosts().then((data: any) => setProfesor(data));
  }, []);

  return (
    <>
      <header className="sticky-top">
        <h1>Administracion de Profesores</h1>
        <button className="bttn">Log Out</button>
        <Filter filterby="Nómina" name={name} setName={setName} category={category} setCategory={setCategory} />
      </header>
      <p>Lista de Profesores</p>

      <button>Registrar Profesor</button>

      <ProList profesores={filteredPros} />
    </>
  );
};

export default ConfigAdmin;
