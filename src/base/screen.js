const match = require('../match');
const action = require('../action');

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
     * @param {boolean} parentScreen.authenticate optional, passed if we need to authenicate on the screen
     */
    constructor(parentScreen) {
        this.screenText = parentScreen.screenText;
        this.generalText = parentScreen.generalText;

        if (parentScreen.open) {
            if (parentScreen.open.isBtn) {
                this.openBtn = parentScreen.open.label;
            } else {
                this.openLabel = parentScreen.open.label;
            }
        }
        this.isEditable = false;
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
        if (parentScreen.authenticate) {
            this.canAuthenticate = parentScreen.authenticate;
        }
    }
    Header() {
        return match.accessible.Header(this.screenText.Header);
    }
    BackButton() {
        // Might be `Done`, `Cancel`, `Status` or the previous
        return match.accessible.BackButton(this.backLabel);
    }
    AddButton() {
        return match.accessible.Button(this.generalText.Add);
    }
    PlusButton() {
        return match.accessible.Button(this.generalText.ButtonLabel.Plus);
    }
    EditButton() {
        return match.accessible.ButtonBarButton(this.generalText.Edit);
    }
    SaveButton() {
        return match.accessible.Button(this.generalText.Save);
    }
    async Authenticate() {
        if (this.canAuthenticate) {
            await device.matchFace();
        }
    }
    async SaveAndClose() {
        if (this.isEditable) {
            await this.SaveButton().tap();
        }
        return null;
    }
    async Plus() {
        if (this.isEditable) {
            await this.PlusButton().tap();
        }
        return null;
    }
    async Add() {
        if (this.isEditable) {
            await this.AddButton().tap();
        }
        return null;
    }
    async Edit() {
        if (this.isEditable) {
            await this.EditButton().tap();
        }
        return null;
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
        return this.OpenButton().tap();
    }
    async CancelAndClose() {
        return this.Back();
    }
    async Back() {
        try {
            await this.BackButton().tap();
        } catch (err) {
            await match.accessible.ButtonBarButton(this.backLabel).tap();
        }
    }
    async Continue() {
        return this.ContinueButton().tap();
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
