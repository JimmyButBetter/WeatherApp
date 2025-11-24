//

async function haeSaa(kaupunki) {
  const apiKey = "9d8fea70fbfc2decfa234cf26349327d"; // lisää oma avain
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${kaupunki}&appid=${apiKey}&units=metric&lang=fi`;
  try {
    const vastaus = await fetch(url);
    if (!vastaus.ok) throw new Error("Kaupunkia ei löytynyt");

    const data = await vastaus.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Virhe haussa:", error);
    return null;
  }
}

async function naytaSaa(a) {
  const kaupunki = a;
  // const tulos = document.querySelector("#tulos");
  const tulos = document.createElement("div");
  document.body.appendChild(tulos);

  const data = await haeSaa(kaupunki);
  if (!data) {
    tulos.textContent = "Säätietoja ei voitu hakea.";
    return;
  }

  const kuvaus = data.weather[0].description;
  const lampo = data.main.temp;
  const ikoni = data.weather[0].icon;

  tulos.innerHTML = `
          <h2>${data.name}</h2>
          <img src="https://openweathermap.org/img/wn/${ikoni}@2x.png">
          <p>${kuvaus}, ${lampo} °C</p>
        `;
}

//document.querySelector("#hae").addEventListener("click", naytaSaa);

naytaSaa("Helsinki");

naytaSaa("Berlin");

naytaSaa("Seoul");

naytaSaa("Beijing");
