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
async function raceRound(player1, player2) {
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
            totalSkill1 = player1.VELOCIDADE + valorSort1;
            totalSkill2 = player2.VELOCIDADE + valorSort2;
            await printResult(player1.NOME,"VELOCIDADE", valorSort1,totalSkill1)
            await printResult(player2.NOME,"VELOCIDADE", valorSort2,totalSkill2)

        }
        if(block=="CURVA") {
            totalSkill1 = player1.MANOBRA + valorSort1;
            totalSkill2 = player2.MANOBRA + valorSort2;   
            await printResult(player1.NOME,"MANOBRABILIDADE", valorSort1,totalSkill1)
            await printResult(player2.NOME,"MANOBRABILIDADE", valorSort2,totalSkill2)

        }
        if(block=="CONFRONTO") { 
            console.log(`${player1.NOME} e ${player2.NOME} entraram em combate.`)
            totalSkill1 = player1.PODER + valorSort1;
            totalSkill2 = player2.PODER + valorSort2;   
            await printResult(player1.NOME,"PODER", valorSort1,totalSkill1)
            await printResult(player2.NOME,"PODER", valorSort2,totalSkill2)  
            
            if(totalSkill1>totalSkill2 && totalSkill2>0){
                totalSkill2--;
                console.log(`${player1.NOME} venceu o combate!`)
            }
            if(totalSkill2>totalSkill1 && totalSkill1>0){
                totalSkill1--;
                console.log(`${player2.NOME} venceu o combate!`)
            }
            if(totalSkill1==totalSkill2){
                console.log("EMPATE, nenhum ponto subtraido!")
            }
            
        }
        if( totalSkill1 > totalSkill2 ){
            console.log(`${player1.NOME} marcou ponto!!`)
            player1.PONTOS++;
        }else if(totalSkill1 < totalSkill2){
            console.log(`${player2.NOME} marcou ponto!!`)
            player2.PONTOS++;   
        }else if(totalSkill1==totalSkill2){
            console.log(`Empate !!`)   
        }
    }
}
async function main(){
    console.log(
        `Iniciando o jogo de corrida entre ${player1.NOME} e ${player2.NOME}...`
    );
    await raceRound(player1, player2);
    if(player1.PONTOS>player2.PONTOS){
        console.log(`\n ${player1.NOME} venceu a disputa!`)
    }else{
        console.log(`\n ${player2.NOME} venceu a disputa!`)
    }
    player1.PONTOS=0;
    player2.PONTOS=0;
};
main();