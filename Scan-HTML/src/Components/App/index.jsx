import { useState } from "react";
import { handleFolderChange } from "../../Utils/handleFolderChange";
import { getInfo } from "../../Utils/getInfo";
import { loadCorrect } from "../../Utils/loadCorrect";

function App() {
  const [folders, setFolders] = useState([]);
  const [fileContents, setFileContents] = useState({});

  const handleChange = (e) => {
    const targetFiles = e.target.files;
    handleFolderChange(targetFiles, setFolders);
  };

  const scanFolders = async () => {
    const contentPromises = folders.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          const content = e.target.result;
          resolve({
            fileName: file.name,
            content,
          });
        };

        reader.readAsText(file);
      });
    });

    const fileContentsArray = await Promise.all(contentPromises);
    const parser = new DOMParser();
    const newFileContents = {};

    fileContentsArray.forEach((fileContent) => {
      newFileContents[fileContent.fileName] = fileContent.content;

      const htmlDocument = parser.parseFromString(
        // Convertir string en un documento HTML
        fileContent.content,
        "text/html"
      );

      getInfo(htmlDocument);
    });

    setFileContents(newFileContents);
  };

  return (
    <>
      <input
        type="file"
        onChange={handleChange}
        webkitdirectory="true"
        multiple
      />
      <button onClick={scanFolders}>Scan</button>
      <button onClick={() => loadCorrect(folders, setFolders)}> Load Correct
      </button>
      <div>
        {folders.map((file, index) => (
          <details key={index}>
            <summary>{file.serial}</summary>
            <pre>
              SERIAL: {file.serial}
              <br />
              {/* DESIGN CAPACITY: {file} */}
              <br />
              {/* FULL CHARGE CAPACITY: {file} */}
              <br />
            </pre>
          </details>
        ))}
      </div>
    </>
  );
}

export { App };
