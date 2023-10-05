import { useState } from "react";
import { handleFolderChange } from "../../Utils/handleFolderChange";
import { getInfo } from "../../Utils/getInfo";
import { loadCorrect } from "../../Utils/loadCorrect";

function App() {
  const [folders, setFolders] = useState([]);

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
            serial: file.serial,
            date: file.date,
          });
        };

        reader.readAsText(file);
      });
    });

    const fileContentsArray = await Promise.all(contentPromises);
    const parser = new DOMParser();
    const newFileContents = {};

    fileContentsArray.forEach((fileContent) => {
      newFileContents[fileContent.serial] = fileContent.content;

      const htmlDocument = parser.parseFromString(
        // Convertir string en un documento HTML
        fileContent.content,
        "text/html"
      );

      const batteryInfo = getInfo(htmlDocument);

      fileContent.designCapacity = batteryInfo.designCapacity;
      fileContent.fullChargeCapacity = batteryInfo.fullChargeCapacity;
      


    });

    console.log(fileContentsArray);
    setFolders(fileContentsArray);
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
      <button onClick={() => loadCorrect(folders, setFolders)}>
        Load Correct
      </button>
      <div>
        {folders.map((file, index) => (
          <details key={index}>
            <summary>{file.serial}</summary>
            <pre>
              DESIGN CAPACITY: {file.designCapacity}
              <br />
              FULL CHARGE CAPACITY: {file.fullChargeCapacity}
              <br />
            </pre>
          </details>
        ))}
      </div>
    </>
  );
}

export { App };
