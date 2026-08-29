export function startEditing(liElement, renderItem) {
    const nameElement = liElement.querySelector(".item-name");

    if (!nameElement) return;

    const previousName = nameElement.textContent;
    liElement.querySelectorAll(".item-name, .delete-button").forEach((element) => {
        element.remove();
    });

    const inputEditElement = document.createElement("input");
    inputEditElement.setAttribute("type", "text");
    inputEditElement.setAttribute("value", previousName);
    inputEditElement.classList.add("edit-input");

    const buttonConfirmElement = document.createElement("button");
    buttonConfirmElement.setAttribute("type", "button");
    buttonConfirmElement.classList.add("edit-confirm-button");
    buttonConfirmElement.innerText = "Alterar";

    const confirmEdit = () => {
        const newName = inputEditElement.value.trim();

        // Um valor vazio não substitui o nome que já existia.
        if (newName === "") {
            inputEditElement.focus();
            return;
        }

        renderItem(liElement, newName);
    };

    buttonConfirmElement.addEventListener("click", confirmEdit);
    inputEditElement.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            confirmEdit();
        }
    });

    liElement.append(inputEditElement, buttonConfirmElement);
    inputEditElement.focus();
}
