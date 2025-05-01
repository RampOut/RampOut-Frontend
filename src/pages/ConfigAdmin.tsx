import { Profesor } from "my-types";
import { useState, useEffect } from "react";
import Filter from "../components/Filter";
import ProList from "../components/ProList";
import { deleteHost, getAllHosts, logOut, updateHost } from "../api/ProfesorAPI";
import { useNavigate } from "react-router-dom";
import { useAuth} from "../auth/AuthProvider";
import "../styles/index.css"; // Importamos los estilos

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
    <div className="rampout-container">
      <header className="rampout-header sticky-top">
        <div className="header-content">
          <h1 className="glow-text">ADMINISTRACIÓN DE PROFESORES</h1>
          <button 
            className="rampout-btn logout-btn" 
            onClick={()=>{
              try{
                logOut();
                alert("Logging Out");
                auth.setIsAuthenticated(false);
              }
              catch(e){console.log(e)}
            }}
          >
            <span className="btn-text">LOG OUT</span>
          </button>
        </div>
        <Filter 
          filterby="Nómina" 
          name={name} 
          setName={setName} 
          category={category} 
          setCategory={setCategory} 
        />
      </header>
      
      <div className="content-container">
        <div className="section-header">
          <h2 className="retro-label">LISTA DE PROFESORES</h2>
          <button 
            className="rampout-btn add-btn"
            onClick={() => {navigate("/registro")}}
          >
            <span className="btn-text">REGISTRAR PROFESOR</span>
          </button>
        </div>
        
        <div className="profesores-list-container">
          <ProList 
            profesores={filteredPros} 
            onDelete={handleDelete} 
            onModify={handleModify}
          />
        </div>
      </div>
    </div>
    </>
  );
};

export default ConfigAdmin;
