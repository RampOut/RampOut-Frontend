import { Profesor } from "my-types";
import { useState, useEffect } from "react";
import Filter from "../components/Filter";
import ProList from "../components/ProList";
import { deleteHost, getAllHosts, updateHost } from "../api/ProfesorAPI";
import { useNavigate } from "react-router-dom";


interface Props {}

const ConfigAdmin = (_props: Props) => {

  const navigate = useNavigate();
  //Filtro
  const [name, setName] = useState<string>("");
  const[category,setCategory] = useState<string>("All")

  // Estado del componente.
  const [profesor, setProfesor] = useState<Profesor[]>([]);

  //Filtra por rol y por nómina
  const filteredPros = profesor.filter((profesor) => {
    return (
      (category === "All" || profesor.role === category) && profesor.username &&
      profesor.username.toLowerCase().includes(name.toLowerCase())
    );
  });

  // Eventos del componente
  useEffect(() => {
    getAllHosts().then((data: any) => setProfesor(data));
  }, []);

  const handleDelete = async (id: number, username:string) => {
    const confirmDelete = confirm(`¿Estás seguro de que quieres eliminar al profesor "${username}"?`);
    if (!confirmDelete) return;

    await deleteHost(id);
    const updatedP = await getAllHosts();
    setProfesor(updatedP ?? []);
  };

  const handleModify = async (id: number, username:string, newPassword:string, newRole:string) => {
    const confirmModify = confirm(`¿Estás seguro de que quieres modificar al profesor "${username}"?`);
    if (!confirmModify) return;

    await updateHost(id,newPassword,newRole);
    const updatedP = await getAllHosts();
    setProfesor(updatedP ?? []);
  };

  return (
    <>
      <header className="sticky-top">
        <h1>Administracion de Profesores</h1>
        <button className="bttn" >Log Out</button>
        <Filter filterby="Nómina" name={name} setName={setName} category={category} setCategory={setCategory} />
      </header>
      <p>Lista de Profesores</p>

      <button onClick={()=>{navigate("/registro")}}>Registrar Profesor</button>

      <ProList profesores={filteredPros} onDelete={handleDelete} onModify={handleModify}/>
    </>
  );
};

export default ConfigAdmin;
