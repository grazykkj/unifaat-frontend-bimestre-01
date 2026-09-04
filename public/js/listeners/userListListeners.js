import { userListApi } from "../api/userListApi.js";
import { userUpdateApi } from "../api/userUpdateApi.js";
import { clearFeedback, renderError, renderPagination, renderUserList } from "../render/listUserRender.js";

const PAGE_LIMIT = 5;
let currentPage = 1;

export async function loadUsers(page = currentPage) {
    try {
        clearFeedback();
        const result = await userListApi({ page, limit: PAGE_LIMIT });
        currentPage = result.page;
        renderUserList(result.data, startEditing);
        renderPagination(result, loadUsers);
    } catch (error) {
        renderError(error.message);
    }
}

function startEditing(item) {
    const name = item.querySelector(".user-name").textContent;
    const email = item.querySelector(".user-email").textContent;
    const details = item.querySelector(".user-details");
    details.replaceChildren(createInput("name", name, "Nome"), createInput("email", email, "E-mail"));
    const editButton = item.querySelector(".edit-button");
    const saveButton = document.createElement("button");
    saveButton.type = "button";
    saveButton.className = "save-button";
    saveButton.textContent = "Salvar";
    saveButton.addEventListener("click", () => saveEditing(item));
    editButton.replaceWith(saveButton);
}

function createInput(name, value, label) {
    const input = document.createElement("input");
    input.type = name === "email" ? "email" : "text";
    input.name = name;
    input.value = value;
    input.placeholder = label;
    input.required = true;
    return input;
}

async function saveEditing(item) {
    const name = item.querySelector('[name="name"]').value.trim();
    const email = item.querySelector('[name="email"]').value.trim();
    if (!name || !email) {
        renderError("Nome e e-mail são obrigatórios.");
        return;
    }
    const button = item.querySelector(".save-button");
    button.disabled = true;
    try {
        clearFeedback();
        await userUpdateApi(item.dataset.userId, { name, email });
        await loadUsers(currentPage);
    } catch (error) {
        button.disabled = false;
        renderError(error.message);
    }
}
