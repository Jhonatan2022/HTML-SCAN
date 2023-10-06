function getInfo(texthtml) {
  const tables = texthtml.getElementsByTagName("table");
  const tbody = tables[1].getElementsByTagName("tbody");
  const rowsTbody = tbody[0].getElementsByTagName("tr");

  const namePc = rowsTbody[0]?.getElementsByTagName("td")[1].innerText;
  const manufacturer = rowsTbody[1]?.getElementsByTagName("td")[1].innerText;
  const serialNumber = rowsTbody[2]?.getElementsByTagName("td")[1].innerText;
  const chemistry = rowsTbody[3]?.getElementsByTagName("td")[1].innerText;
  const designCapacity = rowsTbody[4]?.getElementsByTagName("td")[1].innerText;
  const fullChargeCapacity =
    rowsTbody[6]?.getElementsByTagName("td")[1].innerText;
  const cycleCount = rowsTbody[7]?.getElementsByTagName("td")[1].innerText;

  const designCapacityValue = designCapacity?.match(/\d+/g)?.join("") || "";
  const fullChargeCapacityValue = fullChargeCapacity?.match(/\d+/g)?.join("") || "";
  const cycleCountValue = cycleCount?.match(/\d+/g)?.join("") || "-";

  return {
    namePc,
    manufacturer,
    serialNumber,
    designCapacityValue,
    fullChargeCapacityValue,
    chemistry,
    cycleCountValue,
    // cycleCount,
  };
}

export { getInfo };
