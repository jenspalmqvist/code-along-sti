{
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

  // Alternativt sätt
  // document.getElementById("pokemonForm").onsubmit = onSubmit();
}
