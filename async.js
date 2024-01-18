{
  // En illustration av att kunna göra saker asynkront (parallellt)
  // istället för enbart synkront (seriellt)

  /*
   * Att göra:
   * Sätta på tekokaren
   * Vänta på att vattnet blir varmt
   * Ta fram tekoppar
   * Sätta tepåsar i kopparna
   * Fylla kopparna med kokande vatten
   */
  async function makeTeaAsync() {
    const startTime = Date.now();
    // Om vi inte behöver vänta på att vattnet kokat upp kan vi göra andra saker under tiden
    const boilingWaterPromise = boilWater();
    console.log("2. Ta fram tekoppar");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("3. Ta fram tepåsar");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("4. Väntar på att vattnet ska bli varmt");
    await boilingWaterPromise;
    console.log("6. Fyll kopparna med kokande vatten");
    const endTime = Date.now();
    return endTime - startTime;
  }

  async function boilWater() {
    console.log("1. Startar vattenkokaren");
    // Fördröj programmet i 10 sekunder
    await new Promise((resolve) => setTimeout(resolve, 10000));
    console.log("5. Vattnet kokar");
  }

  // Då vi behöver fejka att saker tar tid i det här scenariot
  // behöver även denna function vara async
  async function makeTeaSync() {
    const startTime = Date.now();
    console.log("1. Startar vattenkokaren");
    console.log("2. Väntar på att vattnet ska bli varmt");
    // Fördröj programmet i 10 sekunder
    await new Promise((resolve) => setTimeout(resolve, 10000));
    console.log("3. Vattnet kokar");
    console.log("4. Ta fram tekoppar");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("5. Ta fram tepåsar");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("6. Fyll kopparna med kokande vatten");
    const endTime = Date.now();
    return endTime - startTime;
  }

  async function start() {
    const asyncResult = await makeTeaAsync();
    const syncResult = await makeTeaSync();
    console.log(`Det tog ${syncResult / 1000} sekunder att fixa teet synkront`);

    console.log(
      `Det tog ${asyncResult / 1000} sekunder att fixa teet asynkront`
    );
  }

  start();
}
