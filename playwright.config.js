const {defineConfig, devices} = require('@playwright/test')
const path = require('path')
const { compute_run_folder, ensure_subdirs } = require('./utils/path_tools')

// Diretórios onde ficam os artefatos
const ARTIFACTS_ROOT = path.join(__dirname, 'artifacts') // artifacts, ou qualquer outro nome, exemplo (evidencias)
const runDir = compute_run_folder(ARTIFACTS_ROOT)
const {resultsDir,screenshotsDir} = ensure_subdirs(runDir)

// Expoe caminhos de diretorios como variaveis de ambiente
process.env.RUN_DIR         = runDir
process.env.SCREENSHOTS_DIR = screenshotsDir

module.exports = defineConfig({
  testDir: './tests',  // Nossos testes estão na pasta testes
  timeout: 30000,     // 30_000 = 30 segudos
  fullyParallel: true, // execução em paralelo / Multi Thread
  outputDir: resultsDir,
    use:{
        baseURL:'https://www.saucedemo.com', // com isso podemos usar o script apenas com ('/')
         headless: false, // false - exibe o browser e true oculta
         // politicas globais de artefatos automaticos
         screenshot: 'only-on-failure', // apenas quando der erro
         video: 'retain-on-failure', // salva o video, se houver erro
         trace: 'retain-on-failure', // salva o trace, se houver erro

        // outros tipos de timeout
        actionTimeout: 15000, // timeout se nada estiver acontecendo em 15segundos
        navigationTimeout: 20000, // se parar a navegação

          launchOptions: {
            slowMo:5 // espere 1 segundo entre cada ação // para uma apresentação
          }
    },

    projects: [
      {
        name: 'chromium',
        use: {...devices['Desktop Chrome']}
      }
    ]
})
