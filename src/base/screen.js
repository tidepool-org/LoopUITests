const match = require('../match');
const action = require('../action');

class Screen {
    /**
     * @param {object} parentScreen
     * @param {string} parentScreen.openLabel not required if `openClickableLabel` given
     * @param {string} parentScreen.openClickableLabel not required if `openLabel` given
     * @param {string} parentScreen.backLabel
     * @param {object} parentScreen.screenText
     * @param {object} parentScreen.generalText
     * @param {boolean} parentScreen.editable optional
     * @param {object} parentScreen.scroll optional
     * @param {string} parentScreen.scroll.visibleBottomLabel label that should be visible if your at the bottom of the screen
     * @param {string} parentScreen.scroll.visibleTopLabel label that should be visible if your at the top of the screen
     */
    constructor(parentScreen) {
        this.openLabel = parentScreen.openLabel;
        this.openClickableLabel = parentScreen.openClickableLabel;
        this.backLabel = parentScreen.backLabel;
        this.screenText = parentScreen.screenText;
        this.generalText = parentScreen.generalText;
        this.isEditable = false;
        if (parentScreen.editable) {
            this.isEditable = parentScreen.editable;
        }
        if (parentScreen.scroll) {
            this.visibleBottomLabel = parentScreen.scroll.visibleBottomLabel;
            this.visibleTopLabel = parentScreen.scroll.visibleTopLabel;
        }
    }
    Header() {
        return match.accessible.Header(this.screenText.Header);
    }
    CancelButton() {
        return match.accessible.Button(this.generalText.Cancel);
    }
    BackButton() {
        if (this.backLabel) {
            return match.accessible.ButtonBarButton(this.backLabel);
        }
        return this.CancelButton();
    }
    AddButton() {
        return match.accessible.ButtonBarButton(this.generalText.Add);
    }
    EditButton() {
        return match.accessible.ButtonBarButton(this.generalText.Edit);
    }
    async Add() {
        if (this.isEditable) {
            await this.AddButton().tap();
        }
    }
    async AddNewEntry() {
        return this.Add();
    }
    async Edit() {
        if (this.isEditable) {
            await this.EditButton().tap();
        }
    }
    ContinueButton() {
        return match.accessible.ButtonBarButton(this.generalText.Continue);
    }
    OpenButton() {
        if (this.openLabel) {
            return match.accessible.Button(this.openLabel);
        }
        return match.accessible.ClickableLabel(this.openClickableLabel);
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
        return this.CancelButton().tap();
    }
    async Back() {
        return this.BackButton().tap();
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

module.exports = {
    Screen
};
