import { CharactersDatabase } from "@/types/CharacterDataBase";
import { useSQLiteContext } from "expo-sqlite";

export function useCharactersDatabase() {
  const database = useSQLiteContext();

  async function showDetails(id: number) {
    try {
      const query = "SELECT * FROM characters WHERE id = ?";

      const response = await database.getFirstAsync<CharactersDatabase>(
        query,
        id
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

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

  async function searchByName(name: string, status: number) {
    if (status > 1) {
      const query = "SELECT * FROM characters WHERE name LIKE ?";
      try {
        const response = await database.getAllAsync<CharactersDatabase>(
          query,
          `%${name}%`,
          status
        );

        return response;
      } catch (error) {
        throw error;
      }
    } else {
      const query = "SELECT * FROM characters WHERE name LIKE ? AND status= ? ";
      try {
        const response = await database.getAllAsync<CharactersDatabase>(
          query,
          `%${name}%`,
          status
        );

        return response;
      } catch (error) {
        throw error;
      }
    }
  }

  async function update(data: CharactersDatabase) {
    const statement = await database.prepareAsync(
      "UPDATE characters SET name = $name, status = $status, species = $species, type = $type, gender = $gender, origin_name = $origin_name, location_name = $location_name WHERE id = $id"
    );

    try {
      await statement.executeAsync({
        $id: data.id,
        $name: data.name,
        $status: data.status,
        $species: data.species,
        $type: data.type,
        $gender: data.gender,
        $origin_name: data.origin_name,
        $location_name: data.location_name,
      });
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function remove(id: number) {
    try {
      await database.execAsync("DELETE FROM characters WHERE id = " + id);
    } catch (error) {
      throw error;
    }
  }

  return { insert, searchByName, showDetails, remove, update };
}
