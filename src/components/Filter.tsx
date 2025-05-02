type Props = {
  filterby: string;
  name: string;
  setName: (name: string) => void;
  category: string;
  setCategory: (category: string) => void;
};

export default function Filter(props: Props) {
  return (
    <>
      <div className="px-2 py-2 filter">
        <h3>Filtro</h3>

        <div className="d-flex gap-4 align-items-end flex-wrap">
          <div className="form-group">
            <label className="form-label mb-1">
              {props.filterby.toUpperCase()}
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Escribe aquí"
              value={props.name}
              onChange={(e) => props.setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label my-1">TIPO DE USUARIO</label>
            <select
              className="form-control"
              value={props.category}
              onChange={(e) => props.setCategory(e.target.value)}
            >
              <option value="All">Todos</option>
              <option value="admin">Administrador</option>
              <option value="user">Usuario</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
