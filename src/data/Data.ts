import {Metal, Payment} from "./types/Types";

export const metals: Metal[] = [
    {
        code: "gold",
        title: "Золото",
        finenessList: [
            { id: 1, value: 375, cash: 90, checkingAccount: 100 },
            { id: 2, value: 575, cash: 190, checkingAccount: 250 },
            { id: 3, value: 750, cash: 300, checkingAccount: 350 },
        ],
    },
    {
        code: "silver",
        title: "Серебро",
        finenessList: [
            { id: 1, value: 800, cash: 50, checkingAccount: 60 },
            { id: 2, value: 925, cash: 65, checkingAccount: 75 },
            { id: 3, value: 999, cash: 80, checkingAccount: 90 },
        ],
    },
    {
        code: "palladium",
        title: "Палладий",
        finenessList: [
            { id: 1, value: 500, cash: 400, checkingAccount: 450 },
            { id: 2, value: 600, cash: 500, checkingAccount: 550 },
            { id: 3, value: 999, cash: 700, checkingAccount: 750 },
        ],
    },
    {
        code: "plating",
        title: "Платина",
        finenessList: [
            { id: 1, value: 800, cash: 500, checkingAccount: 550 },
            { id: 2, value: 900, cash: 600, checkingAccount: 650 },
            { id: 3, value: 950, cash: 700, checkingAccount: 750 },
        ],
    },
];

export const payment: Payment[] = [
    { code: "cash", title: "Наличные" },
    { code: "checkingAccount", title: "На расчётный счёт" },
];
