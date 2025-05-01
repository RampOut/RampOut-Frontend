import "../styles/index.css";

type Props = {
  filterby: string;
  name: string;
  setName: (name: string) => void;
  category: string;
  setCategory: (category: string) => void;
};

export default function Filter(props: Props) {
  return (
    <div className="filter-container">
      <div className="filter-header">
        <div className="retro-badge">FILTRO</div>
      </div>
      
      <div className="filter-controls">
        <div className="filter-input-group">
          <label className="filter-label">
            {props.filterby.toUpperCase()}
          </label>
          <div className="input-container">
            <input
              type="text"
              className="retro-input"
              placeholder="Escribe aquí"
              value={props.name}
              onChange={(e) => props.setName(e.target.value)}
            />
          </div>
        </div>
        
        <div className="filter-select-group">
          <label className="filter-label">TIPO DE USUARIO</label>
          <div className="select-container">
            <select 
              className="retro-select"
              value={props.category} 
              onChange={(e) => props.setCategory(e.target.value)}
            >
              <option value="All">Todos</option>
              <option value="admin">Administrador</option>
              <option value="user">Usuario</option>
            </select>
            <div className="select-arrow">▼</div>
          </div>
        </div>
      </div>
    </div>
  );
}