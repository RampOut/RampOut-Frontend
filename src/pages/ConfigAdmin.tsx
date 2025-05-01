import { Profesor } from "my-types";
import { useState, useEffect } from "react";
import Filter from "../components/Filter";
import ProList from "../components/ProList";
import { deleteHost, getAllHosts, logOut, updateHost } from "../api/ProfesorAPI";
import { useNavigate } from "react-router-dom";
import { useAuth} from "../auth/AuthProvider";

interface Props {}

const ConfigAdmin = (_props: Props) => {
  const auth = useAuth();
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
    <div className="admin" style={{ backgroundColor: '#423782' }}>
      <header className="sticky-top d-flex row w-100 top-0 start-0 gx-0">
        <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center px-2">
        <h1>Administracion de Profesores</h1>
        <button className="bttn" onClick={()=>{
          try{
            logOut();
            alert("Logging Out");
            auth.setIsAuthenticated(false);
          }
          catch(e){console.log(e)}
        }} >Log Out</button>
        </div>
        <div>
        <Filter filterby="Nómina" name={name} setName={setName} category={category} setCategory={setCategory} />
        </div>
        </div>
      </header>

      <p>Lista de Profesores</p>

      <button onClick={()=>{navigate("/registro")}}>Registrar Profesor</button>

      <ProList profesores={filteredPros} onDelete={handleDelete} onModify={handleModify}/>

      </div>
    </>
  );
};

export default ConfigAdmin;
