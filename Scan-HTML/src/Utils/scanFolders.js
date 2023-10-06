import { getInfo } from "./getInfo";

async function scanFolders(folders, setData) {
  const contentPromises = folders.map((file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target.result;
        resolve({
          // fileName: file.name,
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
    newFileContents[fileContent.serial] = fileContent;
    // = fileContent.content;

    const htmlDocument = parser.parseFromString(
      // Convertir string en un documento HTML
      fileContent.content,
      "text/html"
    );

    const batteryInfo = getInfo(htmlDocument);

    fileContent.namePc = batteryInfo.namePc;
    fileContent.manufacturer = batteryInfo.manufacturer;
    fileContent.serialNumber = batteryInfo.serialNumber;
    fileContent.designCapacity = batteryInfo.designCapacityValue;
    fileContent.fullChargeCapacity = batteryInfo.fullChargeCapacityValue;
    fileContent.cycleCount = batteryInfo.cycleCountValue;

    // eliminamos el atributo content
    delete fileContent.content;
  });

  setData(fileContentsArray);
}

export { scanFolders };
