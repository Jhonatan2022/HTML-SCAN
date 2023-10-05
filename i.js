function getInfo() {
  const tables = document.querySelectorAll("table");

  // const table2 = tables[1];
  const rows  = tables[1].querySelector("tbody");

  const rowsTr = rows.querySelectorAll("tr");
  const row4 = rowsTr[4].querySelectorAll("td");
  const row6 = rowsTr[6].querySelectorAll("td");

  const numbers1 = row4[1].innerText.match(/[\d.]+/g);
  const numbers2 = row6[1].innerText.match(/[\d.]+/g);

  console.log(numbers1[0]);
  console.log(numbers2[0]);
}

getInfo();
