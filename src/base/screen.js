const match = require('../match');
const action = require('../action');

async function _sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
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
    }
    Header() {
        return match.accessible.Header(this.screenText.Header);
    }
    BackButton() {
        return match.accessible.ButtonBarButton(this.backLabel);
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
    async Authenticate() {
        await device.matchFace();
        //HACK: the match can take some time so we need to wait
        await _sleep(5000);
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
        await this.Back();
    }
    async Back() {
        await this.BackButton().tap();
    }
    async Continue() {
        await this.ContinueButton().tap();
    }
    async ScrollToBottom() {
        if (this.visibleBottomLabel == null) {
            return;
        }
        try {
            await expect(match.accessible.TextLabel(this.visibleBottomLabel)).toBeVisible();
        } catch (err) {
            await action.ScrollToBottom();
        }
    }
    async SwipeUp(labelElement) {
        try {
            await expect(labelElement).toBeVisible();
        } catch (err) {
            await action.SwipeUp();
        }
    }
    async SwipeDown(label) {
        try {
            await expect(labelElement).toBeVisible();
        } catch (err) {
            await action.SwipeDown();
        }
    }
    async ScrollToTop() {
        if (this.visibleTopLabel == null) {
            return;
        }
        try {
            await expect(match.accessible.TextLabel(this.visibleTopLabel)).toBeVisible();
        } catch (err) {
            await action.ScrollToTop();
        }
    }
}

module.exports = Screen;
