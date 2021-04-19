import "./App.css";
import { data } from "./source";
import { useMemo, useState, useCallback } from "react";
import debounce from "./debounce";
import Masonry from "./Masonry";

export default function App() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useCallback(debounce(setSearchText, 800), []);

  const filteredItems = useMemo(() => {
    const searchReg = new RegExp(searchText.toLowerCase());
    return data
      .filter((e) => searchReg.test(e.name.toLowerCase()))
      .sort((a, b) => {
        const aText = a.name.toLowerCase();
        const bText = b.name.toLowerCase();
        return aText < bText ? -1 : aText > bText ? 1 : 0;
      });
  }, [searchText]); // images dan searchText itu deps nya untuk kalkulasi ulang

  const handleKeyUp = (event) => {
    debouncedSearch(event.target.value || "");
  };

  return (
    <div className="wrapper">
      <header>
        <input type="text" onChange={handleKeyUp} />
      </header>
      <Masonry>
        {filteredItems.map((e) => (
          <div className="brick" key={e._id}>
            <img src={e.src} alt={e.name} />
            <h3>{e.name.toUpperCase()}</h3>
          </div>
        ))}
      </Masonry>
    </div>
  );
}
