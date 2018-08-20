import { padding as paddingSize } from '../config'

export {padding}

function padding(frame: Rectangle) {
	// const win = Window.focused()
	// if (!win) {
	// 	return {width:0, height:0, x:0, y:0};
	// }

	// const screen = win.screen().flippedVisibleFrame()
	// let msg = `Frame: Width=${screen.width}, Height=${screen.height}, X: ${screen.x}, Y:${screen.y}`

	// let modal = Modal.build({
	// 	duration: 5,
	// 	text: msg,
	// 	weight: 16,
	// });
	// modal.showCenterOn(Screen.main());

	return {
		width: frame.width - 2 * paddingSize,
		height: frame.height - 2 * paddingSize,
		x: frame.x + paddingSize,
		y: frame.y + paddingSize,
	}
}
