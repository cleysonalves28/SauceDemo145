const fs = require('fs')
 const path = require('path')

 // constante para armazenar o local onde ficarão gravados os snapsops
 const SHOTS_DIR = process.env.SCREESHOTS_DIR

// Garantir um nome seguro do arquivo / Seja compativel 
function safe_name(name){
    return String(name).replace(/[^\w-:.]/g, '_').slice(0, 120) 
}
/**
 * Salvar o screenshot quando solicitado, com nome amigável // @parameetro=@param
 * @param { import ('@playwright/test').page} page
 * @param {import('@playwright/test').TestInfo} test_info
 * @param {String} label
 */
async function snap(page, test_info, label){
    const file = `${safe_name(test_info.title)}__${safe_name(label)}.png`
      const dest = path.join(SHOTS_DIR, file)

      fs.mkdirSync(SHOTS_DIR, {recursive: true})
      await page.screenshot({path: dest, fullPage: true}) // quando colocamos true ele tira uma foto inteira da tela


}   
module.exports = {snap} // Pra exportar a função para todo projeto / para finalizar
