// snapshot= print -- > Queremos quando falha e quando passa o teste
// 1 print ou varios por execução? Varios
//  Criar uma pasta chamada Snashots(prints) e colocar todos os prints dentro
//  Organize as datas no formato universal (ano - mês - dia 2025-09-29)
// fazer rapido e certo e não rapido e errado
// bibliotecas
const { constants } = require('buffer');
 const fs = require('fs') //File System / biblioteca do sistema Operacional
  const path = require('path') // biblioteca de caminhos de pastas//arquivos

 // Formatar números com zero na frente, se precisar
 function pad2(num) {return String(num).padStart(2, '0')} // padstar quantidade de digitos


// Função para definir data e hora baseado no momento da execução 
function compute_run_folder(baseDir){ // definir a pasta de execução exemplo: iterasys ou Ip
// Cria o carimbo de data via CI(integração COntinua)
if (process.env.RUN_TAG){ // == true
    const tag = process.env.RUN_TAG.replace(/[^\w-:.]/g, '_'); // regex (expressão regular) // CI
      const runDir = path.join(baseDir, tag)
       fs.mkdirSync(runDir, {recursive: true})
       return runDir

}
    
// Verifica data e hora
   const now = new Date() // perguntar para o computar que dia e horas são
    const yyyy = now.getUTCFullYear()// yyyy asignifica ano com 4 digitos
     const MM = pad2(now.getMonth())// MM = mês com dois digitos
       const dd=pad2(now.getDate())  // Dia com dois digitos
        const HH =pad2(now.getHours()) // hora com dois digitos
          const mm = pad2(now.getMinutes()) // Minutos com dois digitos
           const ss = pad2(now.getSeconds()) // Segundos

// const Mes = String(now.getMonth()).padStart(2, '0')
// const dia = Strin(now.getDate()).padStart(2, '0')

// Criar as pastas

const runDir = path.join(baseDir, `${yyyy}`, `${MM}`, `${dd}`, `${HH}-${mm}-${ss}`) // join (juntar) ( `` = isso é uma crase)
fs.mkdirSync(runDir, {recursive:true})
return runDir

}

// Cria subPastas dentro da estruturas de datas e horas
function ensure_subdirs(runDir){
     const dirs = {
        runDir,
        resultsDir: path.join(runDir, 'test-results'),
        screenshotsDir: path.join(runDir,'screenshots')

     }
Object.values(dirs).forEach(d => { // d = diretorio (subdiretorio)
        if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true})
    })
    return dirs

}

module.exports = { compute_run_folder, ensure_subdirs}
