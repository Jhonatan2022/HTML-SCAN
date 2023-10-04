function handleFolderChange(targetFiles, setFolders) {
  const selectedFiles = Array.from(targetFiles);

  // Filtrar que empiezan con report_battery_
  const htmlFiles = selectedFiles.filter((file) =>
    file.name.startsWith("report_battery_")
  );

  // Set para almacenar los seriales
  // const serialSet = new Set();

  // serial webkitRelativePath: "1SXV6D3/battery/report_battery_1695618000000.html"
  htmlFiles.forEach((file) => {
    file.serial = file.webkitRelativePath.split("/")[0];

    // Verificar si el serial ya está en el Set
    // if (serialSet.has(file.serial)) {
    //   // Si esta repetido removemos uno de los archivos del estado
    //   const index = htmlFiles.findIndex((f) => f.serial === file.serial); // 1
    //   htmlFiles.splice(index, 1);
    // } else {
    //   // Si no está en el Set, agrégalo
    //   serialSet.add(file.serial);
    // }
  });

  console.log(selectedFiles);
  // Combina los archivos HTML seleccionados con los que ya estaban en el estado
  setFolders((prevFolders) => [...prevFolders, ...htmlFiles]);
  //   setFolders(htmlFiles);
}

export { handleFolderChange };
