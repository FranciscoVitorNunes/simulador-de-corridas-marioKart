import readline from "readline/promises";
import { stdin as input, stdout as output } from "node:process";

// Lista de personagens com suas habilidades
const personagens = [
    {
        NOME: "Mario",
        VELOCIDADE: 4,
        MANOBRA: 3,
        PODER: 3,
        PONTOS: 0
    },
    {
        NOME: "Peach",
        VELOCIDADE: 3,
        MANOBRA: 4,
        PODER: 2,
        PONTOS: 0
    },
    {
        NOME: "Yoshi",
        VELOCIDADE: 2,
        MANOBRA: 4,
        PODER: 3,
        PONTOS: 0
    },
    {
        NOME: "Bowser",
        VELOCIDADE: 5,
        MANOBRA: 2,
        PODER: 5,
        PONTOS: 0
    },
    {
        NOME: "Luigi",
        VELOCIDADE: 3,
        MANOBRA: 4,
        PODER: 4,
        PONTOS: 0
    },
    {
        NOME: "Donkey Kong",
        VELOCIDADE: 2,
        MANOBRA: 2,
        PODER: 5,
        PONTOS: 0
    }
];


// Função para rolar o dado
async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
};

// Função para imprimir o resultado da jogada
async function printResult(player, skill, sortNumber, fullSkill) {
    const emoji = skill === "VELOCIDADE" ? "🏎️" : 
                  skill === "MANOBRABILIDADE" ? "🎯" : 
                  skill === "PODER" ? "💥" : "❓";

    console.log(`🎲 ${player} usou ${emoji} ${skill}, rolou ${sortNumber} e totalizou ${fullSkill}`);
}

// Função para obter um bloco aleatório
async function getRandomBlock(){
    let random = Math.random();
    let result;

    switch (true) {
        case (random < 0.33):
            result = "RETA";
            break;
        case (random < 0.66):
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
    }
    return result;
}

// Função para simular uma rodada de corrida
async function raceRound(p1, p2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`\n🚦 Rodada ${round}`);
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━");

        let block = await getRandomBlock();
        const blockEmoji = block === "RETA" ? "🛣️" : block === "CURVA" ? "↩️" : "⚔️";

        console.log(`📍 Bloco: ${blockEmoji} ${block}`);

        let valorSort1 = await rollDice();
        let valorSort2 = await rollDice();

        let totalSkill1 = 0;
        let totalSkill2 = 0;

        if (block === "RETA") {
            totalSkill1 = p1.VELOCIDADE + valorSort1;
            totalSkill2 = p2.VELOCIDADE + valorSort2;
            await printResult(p1.NOME, "VELOCIDADE", valorSort1, totalSkill1);
            await printResult(p2.NOME, "VELOCIDADE", valorSort2, totalSkill2);

        } else if (block === "CURVA") {
            totalSkill1 = p1.MANOBRA + valorSort1;
            totalSkill2 = p2.MANOBRA + valorSort2;
            await printResult(p1.NOME, "MANOBRABILIDADE", valorSort1, totalSkill1);
            await printResult(p2.NOME, "MANOBRABILIDADE", valorSort2, totalSkill2);

        } else if (block === "CONFRONTO") {
            console.log(`⚔️ ${p1.NOME} e ${p2.NOME} entraram em combate!`);

            totalSkill1 = p1.PODER + valorSort1;
            totalSkill2 = p2.PODER + valorSort2;
            await printResult(p1.NOME, "PODER", valorSort1, totalSkill1);
            await printResult(p2.NOME, "PODER", valorSort2, totalSkill2);

            if (totalSkill1 > totalSkill2 && totalSkill2 > 0) {
                totalSkill2--;
                console.log(`🏆 ${p1.NOME} venceu o combate!`);
            } else if (totalSkill2 > totalSkill1 && totalSkill1 > 0) {
                totalSkill1--;
                console.log(`🏆 ${p2.NOME} venceu o combate!`);
            } else {
                console.log("🤝 EMPATE no combate! Nenhum ponto subtraído.");
            }
        }

        if (totalSkill1 > totalSkill2) {
            p1.PONTOS++;
            console.log(`⭐ ${p1.NOME} marcou ponto!`);
        } else if (totalSkill1 < totalSkill2) {
            p2.PONTOS++;
            console.log(`⭐ ${p2.NOME} marcou ponto!`);
        } else {
            console.log("⚖️ Empate na rodada!");
        }
    }
}

// Função para verificar o vencedor final
async function checkWin(p1, p2) {
    console.log(`\n🏁 Resultado Final:`);
    console.log(`🎖️ ${p1.NOME}: ${p1.PONTOS} ponto(s)`);
    console.log(`🎖️ ${p2.NOME}: ${p2.PONTOS} ponto(s)`);

    if (p1.PONTOS > p2.PONTOS) {
        console.log(`\n🏆 ${p1.NOME} venceu a disputa!`);
    } else if (p1.PONTOS < p2.PONTOS) {
        console.log(`\n🏆 ${p2.NOME} venceu a disputa!`);
    } else {
        console.log(`\n🤝 EMPATE!`);
    }

    p1.PONTOS = 0;
    p2.PONTOS = 0;
}

// Função principal para iniciar o jogo
async function main(){
    const rl = readline.createInterface({ input, output });

    console.log("👾 Jogadores disponíveis:");
    personagens.forEach(p => {
    console.log(`- ${p.NOME}`);
    console.log(`   🏎️ Velocidade: ${p.VELOCIDADE}`);
    console.log(`   🎯 Manobrabilidade: ${p.MANOBRA}`);
    console.log(`   💥 Poder: ${p.PODER}\n`);
    });

    const nome1 = await rl.question("\nDigite o nome do primeiro jogador: ");
    const nome2 = await rl.question("Digite o nome do segundo jogador: ");

    const p1 = personagens.find(p => p.NOME.toLowerCase() === nome1.toLowerCase());
    const p2 = personagens.find(p => p.NOME.toLowerCase() === nome2.toLowerCase());

    if (!p1 || !p2 || p1 === p2) {
        console.log("\n❌ Jogadores inválidos ou repetidos. Tente novamente.");
        rl.close();
        return;
    }
    await raceRound(p1, p2);
    await checkWin(p1,p2)
};
main();