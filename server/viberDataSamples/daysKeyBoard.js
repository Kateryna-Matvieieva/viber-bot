const DAYS_KEYBOARD = {
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
	ActionBody: "Yes",
	Text: "Text"
}

const createDaysArray = () => {
	const arr = [];

	for(let i = 1; i <= 31; i++) {
		switch (i % 10) {
			case 1:
				arr.push(i+'st');
				break;
			case 2:
				arr.push(i+'nd');
				break;
			case 3:
				arr.push(i+'rd');
				break;
			default:
				arr.push(i+'th');
		}
	}

	return arr;
}

const days = createDaysArray();

days.forEach(day => DAYS_KEYBOARD.Buttons.push({
	...buttonSample,
	ActionBody: day,
	Text: day
}))

export default DAYS_KEYBOARD;
