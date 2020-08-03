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
    }
    Header() {
        return match.accessible.Header(this.screenText.Header);
    }
    BackButtonControl() {
        // Might be `Done`, `Cancel`, `Status` or the previous
        return match.accessible.BackButton(this.backLabel);
    }
    AddButtonControl() {
        return match.accessible.ButtonBarButton(this.generalText.Add);
    }
    EditButtonControl() {
        return match.accessible.ButtonBarButton(this.generalText.Edit);
    }
    ContinueButtonControl() {
        return match.accessible.ButtonBarButton(this.generalText.Continue);
    }
    OpenButtonControl() {
        if (this.openBtn) {
            return match.accessible.Button(this.openBtn);
        }
        return match.accessible.ClickableLabel(this.openLabel);
    }
    async AddAction() {
        if (this.isEditable) {
            await this.AddButtonControl().tap();
        }
    }
    async EditAction() {
        if (this.isEditable) {
            await this.EditButtonControl().tap();
        }
    }
    async IsOn(buttonElement) {
        try {
            await expect(buttonElement).toHaveValue('0');
            return false;
        } catch (err) {
            return true;
        }
    }
    async OpenAction() {
        return this.OpenButtonControl().tap();
    }
    async CancelAndCloseAction() {
        return this.BackAction();
    }
    async BackAction() {
        try {
            return this.BackButtonControl().tap();
        } catch (err) {
            return match.accessible.ButtonBarButton(this.backLabel).tap();
        }
    }
    async ContinueAction() {
        return this.ContinueButtonControl().tap();
    }
    async ScrollToBottomAction() {
        if (this.visibleBottomLabel == null) {
            return;
        }
        try {
            await expect(match.accessible.TextLabel(this.visibleBottomLabel)).toBeVisible();
        } catch (err) {
            await action.ScrollToBottom();
        }
    }
    async ScrollToTopAction() {
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
