class TimerPage {
    //selectores
    get timerTab() {return $('~Timer')};
    get startButton() {return $('~Start')};
    get pauseButton() {return $('~Pause')};
    get deleteButton() {return $('~Delete')};
    get addMinute() {return $('~Add 1 minute')};

    minuteElement(minutes) {
        return $(`android=new UiSelector().text("${minutes}")`);
    }

    secondElement(seconds){
        return $(`android=new UiSelector().text("${seconds}")`);
    }

    //metodos de accion
    async openTimerTab() {
        await this.timerTab.waitForDisplayed({ timeout:5000});
        await this.timerTab.click();
    }

    async setTime(minutes, seconds){
        await this.minuteElement(minutes).click();
        await this.secondElement(seconds).click();
    }

    async startTimer(){
        await this.startButton.click();
    }

    async stopTimer(){
        await this.pauseButton.click();
    }

    async addOneMinute(min){
        //si min es igual a 5 que retorne 5 clicks
        let mult = 1;
        while(mult < min){
            await this.addMinute.click();
            mult++;
        }
    }

    async deleteTimer(){
        await this.deleteButton.click();
    }

}

export default new TimerPage();