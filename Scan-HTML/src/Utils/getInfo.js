function getInfo(texthtml) {
  const tables = texthtml.getElementsByTagName("table");
  const tbody = tables[1].getElementsByTagName("tbody");
  const rowsTbody = tbody[0].getElementsByTagName("tr");

  const designCapacity = rowsTbody[4]?.getElementsByTagName("td")[1].innerText;
  const fullChargeCapacity =
    rowsTbody[6]?.getElementsByTagName("td")[1].innerText;

  const designCapacityValue = designCapacity?.match(/\d+/g)?.join("") || "";
  const fullChargeCapacityValue =
    fullChargeCapacity?.match(/\d+/g)?.join("") || "";

  return {
    designCapacity: designCapacityValue,
    fullChargeCapacity: fullChargeCapacityValue,
  };
}

export { getInfo };
