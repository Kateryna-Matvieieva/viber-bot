const YEARS_KEYBOARD = {
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

YEARS_KEYBOARD.Buttons = [...Array(30).keys()];

YEARS_KEYBOARD.Buttons = YEARS_KEYBOARD.Buttons.map(i => ({
	...buttonSample,
	ActionBody: 2020 - i,
	Text: 2020 - i
}));

export default YEARS_KEYBOARD;
