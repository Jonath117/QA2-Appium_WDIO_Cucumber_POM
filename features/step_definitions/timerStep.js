import { Given, When, Then } from '@wdio/cucumber-framework'
import timerPage from '../../pageObjects/timerPage.js'
const assert = require('assert');

Given('estoy en la pagina Temporizador', async () => {
    await timerPage.openTimerTab();
});

When('creo un temporizador con {string} minutos y {string} segundos', async (minutes, seconds) => {
    await timerPage.setTime(minutes, seconds);
});

Then('el temporizador inicia', async() => {
    await timerPage.startTimer();
    await browser.pause(2000);
});

Then('el temporizador se pausa', async() => {
    await timerPage.stopTimer();
    await browser.pause(2000);
    
});

Then('el temporizador deberia mostrar el boton de Continuar y poder continuar', async() => {
    const esVisible = await timerPage.startButton.waitForDisplayed();
    assert(esVisible, true);

    await browser.pause(2000);

    timerPage.startTimer();
});

When('elimino el temporizador', async() => {
    await timerPage.deleteTimer();
});

Then('el temporizador que cree no deberia existir', async() => {
    const esVisible = await timerPage.startButton.waitForDisplayed({timeout: 3000, reverse: true});
    assert(esVisible, true);
});

Then('le agrego un minuto', async() => {
    await timerPage.addOneMinute(5);

    await browser.pause(3000);
});