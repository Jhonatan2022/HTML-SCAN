import { useState } from "react";

function App() {
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);

  const handleFolderChange = (e) => {
    const selectedFolders = Array.from(e.target.files);
    setFolders(selectedFolders);
  };

  const scanFolders = () => {
    const filePromises = [];

    folders.forEach((folder) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const htmlContent = event.target.result;
        console.log(`HTML content from ${folder.webkitRelativePath}:\n${htmlContent}`);
      };
      reader.readAsText(folder);
    });

    Promise.all(filePromises).then(() => {
      console.log("All files scanned and printed to the console.");
    });
  };

  return (
    <>
      <input type="file" onChange={handleFolderChange} webkitdirectory=''/>
      <button onClick={scanFolders}>Scan</button>
    </>
  );
}

export { App };
