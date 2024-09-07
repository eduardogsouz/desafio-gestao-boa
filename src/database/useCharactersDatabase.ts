import { CharactersDatabase } from "@/types/CharacterDataBase";
import { useSQLiteContext } from "expo-sqlite";

export function useCharactersDatabase() {
  const database = useSQLiteContext();

  async function insert(data: Omit<CharactersDatabase, "id">) {
    const statement = await database.prepareAsync(
      "INSERT INTO characters (name, status, species, type, gender, origin_name, location_name) VALUES ($name, $status, $species, $type, $gender, $origin_name, $location_name)"
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
      });

      const lastInsertedId = result.lastInsertRowId.toLocaleString();

      return { lastInsertedId };
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function searchByName(name: string) {
    const query = "SELECT * FROM characters WHERE name LIKE ?";
    try {
      const response = await database.getAllAsync<CharactersDatabase>(
        query,
        `%${name}%`
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  return { insert, searchByName };
}
