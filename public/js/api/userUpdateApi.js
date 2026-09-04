import { buildApiUrl } from "./apiConfig.js";

export async function userUpdateApi(id, { name, email }) {
    const response = await fetch(buildApiUrl(`/users/${id}`), {
        method: "PUT",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email })
    });
    if (!response.ok) throw new Error("Não foi possível salvar as alterações.");
    return response.json();
}
