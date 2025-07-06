const player1 = {
    NOME: "Rafael Relâmpago",
    VELOCIDADE: 95,
    MANOBRA: 88,
    PODER: 80,
    PONTOS: 0
}

const player2 = {
    NOME: "Luna Veloz",
    VELOCIDADE: 90,
    MANOBRA: 92,
    PODER: 75,
    PONTOS: 0
}

const player3 = {
    NOME: "Trovão Max",
    VELOCIDADE: 85,
    MANOBRA: 79,
    PODER: 95,
    PONTOS: 0
}

const player4 = {
    NOME: "Kira Turbo",
    VELOCIDADE: 87,
    MANOBRA: 85,
    PODER: 88,
    PONTOS: 0
}
const player5 = {
    NOME: "Blade Infernal",
    VELOCIDADE: 82,
    MANOBRA: 90,
    PODER: 78,
    PONTOS: 0
}

const player6 = {
    NOME: "Shadow Nitro",
    VELOCIDADE: 93,
    MANOBRA: 84,
    PODER: 80,
    PONTOS: 0
}

const player7 = {
    NOME: "Tempestade Z",
    VELOCIDADE: 88,
    MANOBRA: 91,
    PODER: 85,
    PONTOS: 0
}

const player8 = {
    NOME: "Vortex Azul",
    VELOCIDADE: 90,
    MANOBRA: 86,
    PODER: 89,
    PONTOS: 0
}


async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}