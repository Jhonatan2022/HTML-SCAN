import { useState } from "react";

function App() {
  const [folders, setFolders] = useState([]);
  const [fileContents, setFileContents] = useState({});

  const handleFolderChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // Filtrar que empiezan con report_battery_
    const htmlFiles = selectedFiles.filter((file) =>
      file.name.startsWith("report_battery_")
    );

    // removemos los archivos que empiezan con report_energy del estado
    htmlFiles.forEach((file) => {
      const index = folders.findIndex((f) => f.name === file.name);
      if (index !== -1) {
        folders.splice(index, 1);
      }
    })

    // Crear un Set para almacenar los seriales
    const serialSet = new Set();

    // serial webkitRelativePath: "1SXV6D3/battery/report_battery_1695618000000.html"
    htmlFiles.forEach((file) => {
      file.serial = file.webkitRelativePath.split("/")[1];
      file.dateModified = file.lastModified;

      // Verificar si el serial ya está en el Set
      if (serialSet.has(file.serial)) {
        // Si esta repetido removemos uno de los archivos del estado
        const index = htmlFiles.findIndex((f) => f.serial === file.serial); // 1
        htmlFiles.splice(index, 1);
      } else {
        // Si no está en el Set, agrégalo
        serialSet.add(file.serial);
      }
    });

    console.log(selectedFiles);
    // Combina los archivos HTML seleccionados con los que ya estaban en el estado
    setFolders((prevFolders) => [...prevFolders, ...htmlFiles]);
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
        onChange={handleFolderChange}
        webkitdirectory="true"
        multiple
      />
      <button onClick={scanFolders}>Scan</button>
      <div>
        {folders.map((file) => (
          <details key={file.serial}>
            <summary>
              {file.serial}--- {file.dateModified}{" "}
            </summary>
            <pre>{fileContents[file.name]}</pre>
          </details>
        ))}
      </div>
    </>
  );
}

export { App };
