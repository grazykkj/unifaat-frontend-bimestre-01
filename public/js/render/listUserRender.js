export function renderUserList(users, onEdit) {
    const list = document.querySelector("#user-list");
    list.replaceChildren(...users.map((user) => createUserItem(user, onEdit)));
}

function createUserItem(user, onEdit) {
    const item = document.createElement("li");
    item.className = "user-item";
    item.dataset.userId = user.id;

    const details = document.createElement("div");
    details.className = "user-details";
    const name = document.createElement("strong");
    name.className = "user-name";
    name.textContent = user.name;
    const email = document.createElement("span");
    email.className = "user-email";
    email.textContent = user.email;
    details.append(name, email);

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "edit-button";
    editButton.textContent = "Editar";
    editButton.addEventListener("click", () => onEdit(item));
    item.append(details, editButton);
    return item;
}

export function renderPagination({ page, next, total }, onPageChange) {
    const previousButton = document.querySelector("#previous-page");
    const nextButton = document.querySelector("#next-page");
    document.querySelector("#current-page").textContent = `Página ${page} de ${Math.max(1, Math.ceil(total / 5))}`;
    previousButton.disabled = page <= 1;
    nextButton.disabled = !next;
    previousButton.onclick = () => onPageChange(page - 1);
    nextButton.onclick = () => onPageChange(next?.page ?? page + 1);
}

export function renderError(message) {
    document.querySelector("#user-feedback").textContent = message;
}

export function clearFeedback() {
    document.querySelector("#user-feedback").textContent = "";
}
