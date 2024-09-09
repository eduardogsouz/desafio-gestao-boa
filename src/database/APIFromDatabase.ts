import { CharactersAPI } from "@/types/CharacterAPI";
import { CharactersDatabase } from "@/types/CharacterDataBase";
import { openDatabaseAsync } from "expo-sqlite";

export async function verifyDatabase() {
  let isDatabaseFill = true;
  const db = await openDatabaseAsync("rickandmorty.db");
  const allRows = await db.getAllAsync("SELECT * FROM characters");

  if (allRows.length > 0) {
    isDatabaseFill = true;
  } else {
    isDatabaseFill = false;
  }

  return isDatabaseFill;
}

async function insertDataInAPI(data: Omit<CharactersDatabase, "id">) {
  const db = await openDatabaseAsync("rickandmorty.db");
  const statement = await db.prepareAsync(
    "INSERT INTO characters (name, status, species, type, gender, origin_name, location_name, image) VALUES ($name, $status, $species, $type, $gender, $origin_name, $location_name, $image)"
  );
  try {
    const result = await statement.executeAsync({
      $name: data.name,
      $status: data.status,
      $species: data.species,
      $type: data.type,
      $gender: data.gender,
      $origin_name: data.origin_name,
      $location_name: data.location_name,
      $image: data.image,
    });

    const lastInsertedId = result.lastInsertRowId.toLocaleString();

    return { lastInsertedId };
  } catch (error) {
    throw error;
  } finally {
    await statement.finalizeAsync();
  }
}

export async function tranferData() {
  let isLoading = true;
  if ((await verifyDatabase()) == false) {
    const baseURL = "https://rickandmortyapi.com/api/character";

    const RequestsArray = [];

    for (let i = 1; i < 43; i++) {
      RequestsArray.push(fetch(baseURL + `?page=${i}`));
    }

    const apiResponse = await Promise.all(RequestsArray);

    const halfResponse = await Promise.all(
      apiResponse.map(async (currentResponse) => {
        return await currentResponse.json();
      })
    );

    const resultsObjectArray: Omit<CharactersAPI, "id">[] = [];

    halfResponse.forEach((currentHalfResponse) =>
      currentHalfResponse.results.forEach(
        (currentCharacter: Omit<CharactersAPI, "id">) => {
          resultsObjectArray.push({
            name: currentCharacter.name,
            status: currentCharacter.status,
            species: currentCharacter.species,
            type: currentCharacter.type,
            gender: currentCharacter.gender,
            origin: {
              name: currentCharacter.origin.name,
            },
            location: {
              name: currentCharacter.location.name,
            },
            image: currentCharacter.image,
          });
        }
      )
    );

    for (const currentCharacter of resultsObjectArray) {
      let name = currentCharacter.name;
      let status;

      if (currentCharacter.status == "Alive") {
        status = true;
      } else {
        status = false;
      }

      let species = currentCharacter.species;
      let type = currentCharacter.type;
      let gender = currentCharacter.gender;
      let origin_name = currentCharacter.origin.name;
      let location_name = currentCharacter.location.name;
      let image = currentCharacter.image;

      const response = await insertDataInAPI({
        name,
        status,
        species,
        type,
        gender,
        origin_name,
        location_name,
        image,
      });

      console.log(response);
    }

    console.log(
      "Carregamento Completo, Dados baixados da API no Banco (OBS: O app sera aberto com dados do banco de dados) !"
    );
    return (isLoading = false);
  } else {
    return (isLoading = false);
  }
}
