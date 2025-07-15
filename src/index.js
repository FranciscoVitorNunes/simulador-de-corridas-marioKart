import readline from "readline/promises";
import { stdin as input, stdout as output } from "node:process";

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



async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
};

async function printResult(player,terrains, sortNumber, fullSkill) {
    console.log(`${player} rolou um dado de ${terrains} ${sortNumber} e tem um total de ${fullSkill}`);
}

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
async function raceRound(p1, p2) {
    for(let round=1;round <= 5; round++) {
        console.log(
            ` Rodada ${round}`
        )
        let block = await getRandomBlock()
        console.log(`Bloco: ${block}`)

        let valorSort1 = await rollDice();
        let valorSort2 = await rollDice();

        let totalSkill1 = 0
        let totalSkill2 = 0

        if(block=="RETA") {
            totalSkill1 = p1.VELOCIDADE + valorSort1;
            totalSkill2 = p2.VELOCIDADE + valorSort2;
            await printResult(p1.NOME,"VELOCIDADE", valorSort1,totalSkill1)
            await printResult(p2.NOME,"VELOCIDADE", valorSort2,totalSkill2)

        }
        if(block=="CURVA") {
            totalSkill1 = p1.MANOBRA + valorSort1;
            totalSkill2 = p2.MANOBRA + valorSort2;   
            await printResult(p1.NOME,"MANOBRABILIDADE", valorSort1,totalSkill1)
            await printResult(p2.NOME,"MANOBRABILIDADE", valorSort2,totalSkill2)

        }
        if(block=="CONFRONTO") { 
            console.log(`${p1.NOME} e ${p2.NOME} entraram em combate.`)
            totalSkill1 = p1.PODER + valorSort1;
            totalSkill2 = p2.PODER + valorSort2;   
            await printResult(p1.NOME,"PODER", valorSort1,totalSkill1)
            await printResult(p2.NOME,"PODER", valorSort2,totalSkill2)  
            
            if(totalSkill1>totalSkill2 && totalSkill2>0){
                totalSkill2--;
                console.log(`${p1.NOME} venceu o combate!`)
            }
            if(totalSkill2>totalSkill1 && totalSkill1>0){
                totalSkill1--;
                console.log(`${p2.NOME} venceu o combate!`)
            }
            if(totalSkill1==totalSkill2){
                console.log("EMPATE, nenhum ponto subtraido!")
            }
            
        }
        if( totalSkill1 > totalSkill2 ){
            console.log(`${p1.NOME} marcou ponto!!`)
            p1.PONTOS++;
        }else if(totalSkill1 < totalSkill2){
            console.log(`${p2.NOME} marcou ponto!!`)
            p2.PONTOS++;   
        }else if(totalSkill1==totalSkill2){
            console.log(`Empate !!`)   
        }
    }
}
async function checkWin(p1,p2){
    console.log(`\n ${p1.NOME} fez ${p1.PONTOS} pontos.`)
    console.log(`\n${p2.NOME} fez ${p2.PONTOS} pontos.`)

    if(p1.PONTOS>p2.PONTOS)
        console.log(`\n ${p1.NOME} venceu a disputa!`)
    else if(p1.PONTOS<p2.PONTOS)
        console.log(`\n ${p2.NOME} venceu a disputa!`)
    else
        console.log(`\n  EMPATE!`)

    p1.PONTOS=0;
    p2.PONTOS=0;
}
async function main(){
    const rl = readline.createInterface({ input, output });

    console.log("👾 Jogadores disponíveis:");
    personagens.forEach(p => console.log("- " + p.NOME));

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