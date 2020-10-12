/* eslint-disable no-undef */
const match = require('../match');
const action = require('../action');

async function _sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function _deviceInfo() {
    let deviceName = device.name;
    if (deviceName.includes('iPhone SE')) {
        return {
            smallScreen: true,
            useFaceID: false,
        }
    }
    return {
        smallScreen: false,
        useFaceID: true,
    }
}

class Screen {
    /**
     * @param {object} parentScreen
     * @param {object} parentScreen.screenText
     * @param {object} parentScreen.generalText
     *
     * @param {object} parentScreen.open
     * @param {string} parentScreen.open.label
     * @param {boolean} parentScreen.open.isBtn
     *
     * @param {object} parentScreen.header optional
     * @param {boolean} parentScreen.header.editable optional
     * @param {string} parentScreen.header.backLabel optional
     *
     * @param {object} parentScreen.scroll optional
     * @param {string} parentScreen.scroll.visibleBottomLabel label that should be visible if your at the bottom of the screen
     * @param {string} parentScreen.scroll.visibleTopLabel label that should be visible if your at the top of the screen
     *
     */
    constructor(parentScreen) {
        this.screenText = parentScreen.screenText;
        this.generalText = parentScreen.generalText;
        this.isEditable = false;

        if (parentScreen.open) {
            if (parentScreen.open.isBtn) {
                this.openBtn = parentScreen.open.label;
            } else {
                this.openLabel = parentScreen.open.label;
            }
        }
        if (parentScreen.header) {
            if (parentScreen.header.editable) {
                this.isEditable = parentScreen.header.editable;
            }
            this.backLabel = parentScreen.header.backLabel;
        }
        if (parentScreen.scroll) {
            this.visibleBottomLabel = parentScreen.scroll.visibleBottomLabel;
            this.visibleTopLabel = parentScreen.scroll.visibleTopLabel;
        }
        this._deviceInfo = _deviceInfo();
    }
    Header() {
        return match.accessible.Header(this.screenText.Header);
    }
    BackButton() {
        return match.accessible.ButtonBarButton(this.backLabel);
    }
    CancelButton() {
        return match.accessible.ButtonBarButton(this.generalText.Cancel);
    }
    AddButton() {
        return match.accessible.Button(this.generalText.Add);
    }
    PlusButton() {
        return match.accessible.Button(this.generalText.ButtonLabel.Plus);
    }
    EditButton() {
        return match.accessible.Button(this.generalText.Edit);
    }
    SaveButton() {
        return match.accessible.Button(this.generalText.Save);
    }
    async Select(element) {
        await element.tap();
    }
    async Authenticate() {
        if (this._deviceInfo.useFaceID) {
            await device.matchFace();
        } else {
            await device.matchFinger();
        }
        //HACK: the match can take some time so we need to wait
        await _sleep(5000);
    }
    async wait(millisecs) {
        await _sleep(millisecs);
    }
    async SaveAndClose() {
        if (this.isEditable == false) {
            return;
        }
        await this.SaveButton().tap();
    }
    async Plus() {
        if (this.isEditable == false) {
            return;
        }
        await this.PlusButton().tap();
    }
    async Add() {
        if (this.isEditable == false) {
            return;
        }
        await this.AddButton().tap();
    }
    async Edit() {
        if (this.isEditable == false) {
            return;
        }
        await this.EditButton().tap();
    }
    ContinueButton() {
        return match.accessible.ButtonBarButton(this.generalText.Continue);
    }
    OpenButton() {
        if (this.openBtn) {
            return match.accessible.Button(this.openBtn);
        }
        return match.accessible.ClickableLabel(this.openLabel);
    }
    async IsOn(buttonElement) {
        try {
            await expect(buttonElement).toHaveValue('0');
            return false;
        } catch (err) {
            return true;
        }
    }
    async Open() {
        await this.OpenButton().tap();
    }
    async CancelAndClose() {
        try {
            await this.CancelButton().tap();
        } catch (err) {
            await this.Back();
        }
    }
    async Back() {
        await this.BackButton().tap();
    }
    async Continue() {
        await this.ContinueButton().tap();
    }
    async ScrollToBottom() {
        if (this.visibleBottomLabel == null) {
            await action.ScrollToBottom();
        }
        try {
            await expect(match.accessible.TextLabel(this.visibleBottomLabel)).toBeVisible();
        } catch (err) {
            await action.ScrollToBottom();
        }
    }
    async SwipeUp(labelElement, index) {
        try {
            await expect(labelElement).toBeVisible();
        } catch (err) {
            await action.SwipeUp(index);
        }
    }
    async SwipeUpUntilVisible(labelToSee) {
        await action.SwipeUpUntilVisible(labelToSee);
    }
    async SwipeDownUntilVisible(labelToSee) {
        await action.SwipeDownUntilVisible(labelToSee);
    }
    async ScrollToTop() {
        if (this.visibleTopLabel == null) {
            await action.ScrollToTop();
        }
        try {
            await expect(match.accessible.TextLabel(this.visibleTopLabel)).toBeVisible();
        } catch (err) {
            await action.ScrollToTop();
        }
    }
    async DismissAlert(label) {
        await match.accessible.Button(label).tap();
    }
}

module.exports = Screen;
