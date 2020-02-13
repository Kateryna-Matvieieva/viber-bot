const MONTHS_KEYBOARD = {
	Type: "keyboard",
	Revision: 1,
	Buttons: []
};

const buttonSample = {
	Columns: 2,
	Rows: 1,
	BgColor: "#e6f5ff",
	BgLoop: true,
	ActionType: "reply",
};

export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

MONTHS_KEYBOARD.Buttons = [ ...months ];

MONTHS_KEYBOARD.Buttons = MONTHS_KEYBOARD.Buttons.map(month => ({
	...buttonSample,
	ActionBody: month,
	Text: month
}))

export default MONTHS_KEYBOARD;
