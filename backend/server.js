const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const DATA_FILE = path.join("/data", "users.json");

const seedUsers = [
    ["Ana Martins", "ana.martins@unifaat.edu.br"],
    ["Carlos Souza", "carlos.souza@unifaat.edu.br"],
    ["Fernanda Lima", "fernanda.lima@unifaat.edu.br"],
    ["João Oliveira", "joao.oliveira@unifaat.edu.br"],
    ["Mariana Costa", "mariana.costa@unifaat.edu.br"],
    ["Pedro Almeida", "pedro.almeida@unifaat.edu.br"],
    ["Camila Rocha", "camila.rocha@unifaat.edu.br"],
    ["Lucas Fernandes", "lucas.fernandes@unifaat.edu.br"],
    ["Beatriz Gomes", "beatriz.gomes@unifaat.edu.br"],
    ["Rafael Santos", "rafael.santos@unifaat.edu.br"],
    ["Juliana Alves", "juliana.alves@unifaat.edu.br"],
    ["Gabriel Nunes", "gabriel.nunes@unifaat.edu.br"]
].map(([name, email], index) => ({ id: index + 1, name, email }));

function ensureDataFile() {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]");
}

function readUsers() {
    ensureDataFile();
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

function writeUsers(users) {
    ensureDataFile();
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
}

function send(response, status, data) {
    response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
    response.end(JSON.stringify(data));
}

function readBody(request) {
    return new Promise((resolve, reject) => {
        let body = "";
        request.on("data", (chunk) => { body += chunk; });
        request.on("end", () => {
            try { resolve(JSON.parse(body || "{}")); } catch { reject(new Error("JSON inválido.")); }
        });
    });
}

function startServer() {
    http.createServer(async (request, response) => {
        const url = new URL(request.url, "http://localhost");

        if (request.method === "GET" && url.pathname === "/users") {
            const page = Math.max(1, Number.parseInt(url.searchParams.get("page"), 10) || 1);
            const limit = Math.max(1, Number.parseInt(url.searchParams.get("limit"), 10) || 5);
            const users = readUsers();
            const start = (page - 1) * limit;
            const data = users.slice(start, start + limit);
            const next = start + limit < users.length ? { page: page + 1, limit } : null;
            return send(response, 200, { page, limit, total: users.length, next, data });
        }

        const match = url.pathname.match(/^\/users\/(\d+)$/);
        if (request.method === "PUT" && match) {
            try {
                const { name, email } = await readBody(request);
                if (!name?.trim() || !email?.trim()) return send(response, 422, { message: "Nome e e-mail são obrigatórios." });
                const users = readUsers();
                const user = users.find((item) => item.id === Number(match[1]));
                if (!user) return send(response, 404, { message: "Usuário não encontrado." });
                user.name = name.trim();
                user.email = email.trim();
                writeUsers(users);
                return send(response, 200, user);
            } catch (error) {
                return send(response, 400, { message: error.message });
            }
        }

        send(response, 404, { message: "Rota não encontrada." });
    }).listen(3000, () => console.log("API disponível na porta 3000"));
}

const command = process.argv[2];
if (command === "migrate") {
    ensureDataFile();
    console.log("Migração concluída.");
} else if (command === "seed") {
    writeUsers(seedUsers);
    console.log("12 usuários inseridos.");
} else {
    startServer();
}
