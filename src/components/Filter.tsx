type Props = {
    filterby:string;
    name: string;
    setName: (name: string) => void;
    category:string;
    setCategory: (category:string)=>void,
  };
  
  export default function Filter(props: Props) {
    return (
      <>
        <div className="px-4 py-3 border-b-slate-400 border-b-2 filter">
          <h3 className="text-md font-medium mb-2 text-gray-600">Filtro</h3>
          <div className="flex space-x-4">
            <div className="w-full ">
              <label className="block text-sm font-medium text-gray-600 m-2">
                {props.filterby.toUpperCase()}
              </label>
              <input
                type="text"
                className="border rounded-md px-3 py-2 w-full"
                placeholder="Escribe aqui"
                value={props.name}
                onChange={(e) => props.setName(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div>
          <select value={props.category} onChange={(e)=> props.setCategory(e.target.value)}>
            <option key={1} value="All">
              Todos
            </option>
            <option key={2} value="admin">
              Administrador
            </option>
            <option key={3} value="user">
              Usuario
            </option>
          </select>
        </div>
      </>
    );
  }