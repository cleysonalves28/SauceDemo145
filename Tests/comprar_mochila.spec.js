// 1 - Referência e bibliotecas
// Declara um objeto chamado test vindo da biblioteca Playwright
const { test, expect } = require('@playwright/test')

// 2 - Classe ou Funções ou Métódos
// Um script pode executar de forma:
// - Sincrona: Simultâneo. Ex.: ligação de voz
// - Assincrona: Separados - Não simultaneos. Ex.: Mensagem de texto no WhatsApp
test('Realizar o fluxo de compra da mochila', async ({page}) => {
     await page.goto('/') // abre o browser no site alvo
     await expect(page).toHaveURL('/')            // verifica se está na página raiz
     const botao_login = page.locator('#login-button') // id
     await expect(botao_login).toHaveText('Login') // verifica elemento escrito Login
    

// pagina inicial realizar o login
//Preencher o campo cujo localizador é name com o valor standar_user
await page.fill('[name= "user-name"]', 'standard_user') // fill significa escrever
// Preencher o campo cujo localizador é cssSelector com o valor secret_sauce
await page.fill('[placeholder="Password"]', 'secret_sauce')
//  Clicar no botão Login
await botao_login.click()

// Pagina de inventario / Produtos
// Verificar se está na página certa
await expect(page).toHaveURL(/.*inventory/)
// Se precisar mudar de valor 2 ou mais vezes
// trocar de const para let (variavel)
const tituloSecao = 'Span.title' //cssSelector
await expect(page.locator(tituloSecao)).toHaveText('Products')

// Adicionar a mochila ao carrinho de compras
const btnAdicionar = 'xpath=/html/body/div/div/div/div[2]/div/div/div/div[1]/div[2]/div[2]/button'
await page.locator(btnAdicionar).click()

// verificar se exibe o nº1 no carrinho de compras
// const iconeQuantidadeCarrinho = 'span.shopping_cart_badge // cssSelector
// #shopping_cart_container > a > span - outra opção
const iconeQuantidadeCarrinho = 'span.shopping_cart_badge' // cssSelector
await expect(page.locator(iconeQuantidadeCarrinho)).toHaveText('1')
// Clicar no icone do carrinho (nº1)
await page.locator(iconeQuantidadeCarrinho).click()

// espera de 1 segundo
await page.waitForTimeout(3000) // mal visto // alfinite

// Verificar se está na página certa - Cart
await expect(page).toHaveURL(/.*cart/)
//tituloSecao = 'Span.title' //cssSelector // nem precisa usar porque já existe uma const linha 27
await expect(page.locator(tituloSecao)).toHaveText('Your Cart')

// Verificar dados funcionais
    await expect(page.locator('.cart_quantity')).toHaveText('1')
    await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack')
    await expect(page.locator('.inventory_item_price')).toHaveText('$29.99')

// clicar no botão Checkout
   await page.click('#checkout')

// verificar se está na pagina 
await expect(page).toHaveURL(/.*checkout-step-one/)
await expect(page.locator(tituloSecao)).toHaveText('Checkout: Your Information')

// Preencher os campos
await page.fill('[data-test="firstName"]', 'Cleyson')
await page.fill('[data-test="lastName"]' , 'Alves')
await page.fill('[data-test="postalCode"]' , '06516080')
// await page.click('#continue') exemplos
// await page.click('input.submit-button.btn.btn_primary.cart_button.btn_action') // CssSelector
await page.click('[name="continue"]')

// verificar se está na pagina 
await expect(page).toHaveURL(/.*checkout-step-two/)
await expect(page.locator(tituloSecao)).toHaveText('Checkout: Overview')
await expect(page.locator('.cart_quantity')).toHaveText('1')
await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack')
await expect(page.locator('.inventory_item_price')).toHaveText('$29.99')
await expect(page.locator('[data-test="payment-info-label"]')).toHaveText('Payment Information:')
await expect(page.locator('[data-test="payment-info-value"]')).toHaveText('SauceCard #31337')
await expect(page.locator('[data-test="shipping-info-value"]')).toHaveText('Free Pony Express Delivery!')
await expect(page.locator('[data-test="subtotal-label"]')).toHaveText('Item total: $29.99')
await expect(page.locator('.summary_tax_label')).toHaveText('Tax: $2.40')
await expect(page.locator('[data-test="total-label"]')).toHaveText('Total: $32.39')
await page.click('#finish')

// Frase de Agradecimento
// Verificar pagina
await expect(page).toHaveURL(/.*checkout-complete/)
await expect(page.locator(tituloSecao)).toHaveText('Checkout: Complete!')
await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!')

    // espera de 1 segundo
await page.waitForTimeout(4000) // mal visto // alfinite


}) // Final do teste