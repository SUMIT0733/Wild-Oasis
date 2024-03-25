import { useSearchParams } from "react-router-dom";
import Select from "./Select.jsx";

function SortBy({ options }) {
  const [params, setparams] = useSearchParams();
  const sortBy = params.get("sortBy") || "";

  function handleChange(e) {
    params.set("sortBy", e.target.value);
    setparams(params);
  }

  return (
    <div>
      <Select
        options={options}
        type="white"
        onChange={handleChange}
        value={sortBy}
      />
    </div>
  );
}

export default SortBy;
