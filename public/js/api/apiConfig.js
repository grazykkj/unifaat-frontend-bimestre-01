// A API é encaminhada pelo Nginx no mesmo endereço do frontend.
export const API_BASE_URL = "";

export function buildApiUrl(path) {
    return new URL(path, API_BASE_URL || window.location.origin);
}
