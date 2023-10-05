function handleFolderChange(targetFiles, setFolders) {
  const selectedFiles = Array.from(targetFiles);

  // Filtrar que empiezan con report_battery_
  const htmlFiles = selectedFiles.filter((file) =>
    file.name.startsWith("report_battery_")
  );

  // serial webkitRelativePath: "1SXV6D3/battery/report_battery_1695618000000.html"
  htmlFiles.forEach((file) => {
    file.serial = file.webkitRelativePath.split("/")[1];
    // extraemos el valor numerico del nombre del archivo
    file.timestamp = file.name.split("_")[2].split(".")[0];
    file.date = new Date(Number(file.timestamp)).toString();
  });

  console.log(selectedFiles);
  // Combina los archivos HTML seleccionados con los que ya estaban en el estado
  setFolders((prevFolders) => [...prevFolders, ...htmlFiles]);
  //   setFolders(htmlFiles);
}

export { handleFolderChange };
