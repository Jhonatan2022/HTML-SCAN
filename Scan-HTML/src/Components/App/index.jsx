import { useState } from "react";
import { Details } from "../Details";
import { handleFolderChange } from "../../Utils/handleFolderChange";
import { loadCorrect } from "../../Utils/loadCorrect";
import { scanFolders } from "../../Utils/scanFolders";

function App() {
  const [folders, setFolders] = useState([]);
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    const targetFiles = e.target.files;
    handleFolderChange(targetFiles, setFolders);
  };

  return (
    <>
      <input
        type="file"
        onChange={handleChange}
        webkitdirectory="true"
        multiple
      />
      <button onClick={() => scanFolders(folders, setData)}>Scan</button>
      <button onClick={() => loadCorrect(folders, setFolders)}>
        Load Correct
      </button>
      <Details data={data} />
    </>
  );
}

export { App };
