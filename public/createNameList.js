import { startEditing } from "./editName.js";

function renderItem(liElement, name) {
    liElement.querySelectorAll(
        ".item-name, .delete-button, .edit-input, .edit-confirm-button"
    ).forEach((element) => {
        element.remove();
    });

    const nameElement = document.createElement("span");
    nameElement.classList.add("item-name");
    nameElement.innerText = name;

    const buttonDeleteElement = document.createElement("button");
    buttonDeleteElement.setAttribute("type", "button");
    buttonDeleteElement.classList.add("delete-button");
    buttonDeleteElement.innerText = "Excluir";
    buttonDeleteElement.addEventListener("click", (event) => {
        // currentTarget é o botão que possui o listener, não o item clicado.
        event.currentTarget.parentElement.remove();
    });

    liElement.append(nameElement, buttonDeleteElement);
}

export function createNameList(name) {
    const liElement = document.createElement("li");
    renderItem(liElement, name);

    liElement.addEventListener("click", (event) => {
        const clickedElement = event.target;

        // O listener está no li (currentTarget), mas só o texto inicia a edição.
        if (clickedElement.classList.contains("item-name")) {
            startEditing(event.currentTarget, renderItem);
        }
    });

    return liElement;
}
