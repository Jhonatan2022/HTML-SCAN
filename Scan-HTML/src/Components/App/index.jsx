import { useState } from "react";
import { handleFolderChange } from "../../Utils/handleFolderChange";

function App() {
  const [folders, setFolders] = useState([]);
  const [fileContents, setFileContents] = useState({});

  const handleChange = (e) => {
    const targetFiles = e.target.files;
    handleFolderChange(targetFiles, setFolders);
  };

  const scanFolders = async () => {
    console.log(folders);
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
    const newFileContents = {};

    fileContentsArray.forEach((fileContent) => {
      newFileContents[fileContent.fileName] = fileContent.content;
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
      <div>
        {folders.map((file, index) => (
          <details key={index}>
            <summary>
              {file.serial}--- {file.lastModified} --- {index}
            </summary>
            <pre>
              SERIAL: {file.serial} {fileContents[file.name]}
            </pre>
          </details>
        ))}
      </div>
    </>
  );
}

export { App };
