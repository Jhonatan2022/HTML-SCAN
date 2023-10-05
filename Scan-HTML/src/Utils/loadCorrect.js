const loadCorrect = (folders, setFolders) => {
  const uniqueFiles = {};

  folders.forEach((file) => {
    const serial = file.serial;
    const date = file.date;

    if (uniqueFiles[serial]) {
      // Si ya existe un mismo serial, comparar las fechas
      if (date > uniqueFiles[serial].date) {
        // fecha actual es más reciente, reemplazar el archivo en uniqueFiles
        uniqueFiles[serial] = file;
      }
    } else {
      // Si serial no existe en uniqueFiles, agregarlo
      uniqueFiles[serial] = file;
    }
  });

  // Convertir el objeto uniqueFiles en un arreglo de objetos
  const uniqueFilesArray = Object.values(uniqueFiles);

  setFolders(uniqueFilesArray);
};

export { loadCorrect };
