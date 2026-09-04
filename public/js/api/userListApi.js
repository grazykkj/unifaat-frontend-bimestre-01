import { buildApiUrl } from "./apiConfig.js";

export async function userListApi({ page = 1, limit = 5 } = {}) {
    const url = buildApiUrl("/users");
    url.searchParams.set("page", page);
    url.searchParams.set("limit", limit);

    const response = await fetch(url, { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error("Não foi possível carregar os usuários.");
    return response.json();
}
