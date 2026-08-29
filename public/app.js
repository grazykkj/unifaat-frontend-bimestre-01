import { createNameList } from "./createNameList.js";
import { createUl } from "./createUl.js";

const names = [
    "Ana Martins",
    "Carlos Souza",
    "Fernanda Lima",
    "João Oliveira",
    "Mariana Costa",
    "Pedro Almeida",
    "Camila Rocha",
    "Lucas Fernandes",
    "Beatriz Gomes",
    "Jefferson github"
];

const sectionListElement = document.querySelector("#list-container");
const inputListAddElement = document.querySelector("#list-add");
const buttonListAddElement = document.querySelector("aside .btn");
const ulElement = createUl();

sectionListElement.append(ulElement);

names.forEach((name) => {
    ulElement.append(createNameList(name));
});

buttonListAddElement.addEventListener("click", () => {
    const value = inputListAddElement.value.trim();

    if (value === "") return;

    ulElement.append(createNameList(value));
    inputListAddElement.value = "";
});
