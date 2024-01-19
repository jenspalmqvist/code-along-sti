{
  if (!localStorage.getItem("pokemon")) {
    console.log("first time!");
    localStorage.setItem("pokemon", JSON.stringify([]));
  } else {
    const localPokemonData = JSON.parse(localStorage.getItem("pokemon"));
    if (localPokemonData.length > 0) {
      localPokemonData.forEach((pokemon) => createPokemonBlock(pokemon));
    }
  }

  function clearLocalData() {
    localStorage.setItem("pokemon", JSON.stringify([]));
  }

  async function onSubmit(event) {
    event.preventDefault();
  }

  document.getElementById("pokemonForm").onsubmit = async (event) => {
    event.preventDefault();
    await getPokemonData();
  };

  async function getPokemonData() {
    const pokemonId = document.getElementById("pokemonInput").value;

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    );

    const pokemonData = await response.json();

    const localPokemonData = JSON.parse(localStorage.getItem("pokemon"));

    localPokemonData.push({
      name: pokemonData.name,
      id: pokemonData.id,
      height: pokemonData.height,
    });

    localStorage.setItem("pokemon", JSON.stringify(localPokemonData));

    createPokemonBlock(pokemonData);
  }

  function createPokemonBlock(pokemonData) {
    const container = document.getElementById("gridContainer");

    const pokemonBlock = document.createElement("div");

    pokemonBlock.innerHTML = `
    <div> Id: ${pokemonData.id} </div>
    <div> Name: ${pokemonData.name} </div>
    <div> Height: ${pokemonData.height} </div>
    `;

    container.appendChild(pokemonBlock);
  }

  function onNameChange(event) {
    console.log("Change!");
    sessionStorage.setItem("name", event.target.value);
  }

  const nameInput = document.getElementById("nameInput");

  if (sessionStorage.getItem("name")) {
    nameInput.value = sessionStorage.getItem("name");
  }

  const pName = document.getElementById("sessionName");
  pName.innerText = sessionStorage.getItem("name");
}
