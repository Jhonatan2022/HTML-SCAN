function handleFolderChange(targetFiles, setFolders) {
  const selectedFiles = Array.from(targetFiles);

  // Filtrar que empiezan con report_battery_
  const htmlFiles = selectedFiles.filter((file) =>
    file.name.startsWith("report_battery_")
  );

  // serial webkitRelativePath: "1SXV6D3/battery/report_battery_1695618000000.html"
  htmlFiles.forEach((file) => {
    file.serial = file.webkitRelativePath.split("/")[1];
    // extraemos el valor numérico del nombre del archivo
    file.timestamp = file.name.split("_")[2].split(".")[0];
    const timestamp = parseInt(file.timestamp);

    const date = new Date(timestamp);
    const day = date.getDate();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Formatear el mes con dos dígitos
    const year = date.getFullYear();

    // formato dd/mm/yyyy
    file.date = `${day}/${month}/${year}`;
  });

  // Combina archivos seleccionados con los que ya estaban en el estado
  setFolders((prevFolders) => [...prevFolders, ...htmlFiles]);
}

export { handleFolderChange };
