import './screen';
import './window';

import {frameRatio} from './calc';
import {hyper, hyperShift} from './config';
import {onKey} from './key';
import {titleModal} from './modal';
import {padding, windowLocation} from './misc/padding';

Phoenix.set({
	daemon: true,
	openAtLogin: true,
});

onKey('left', hyper, () => {
	const win = Window.focused();
	if (!win) {
		return;
	}

	const {width, height, x, y} = win.screen().flippedVisibleFrame()
	const frame = {width: Math.floor(width / 2), height, x, y}

	win.setFrame(padding(frame, windowLocation.Left));
	win.clearUnmaximized();
});

onKey('right', hyper, () => {
	const win = Window.focused();
	if (!win) {
		return;
	}

	const {width, height, x, y} = win.screen().flippedVisibleFrame();
	const frame = {
		width: Math.floor(width / 2),
		height,
		x: x + Math.ceil(width / 2),
		y,
	};

	win.setFrame(padding(frame, windowLocation.Right));
	win.clearUnmaximized();
});

onKey('up', hyper, () => {
	const win = Window.focused();
	if (!win) {
		return;
	}

	const {width, x} = win.frame();
	let {height, y} = win.screen().flippedVisibleFrame();
	height = Math.ceil(height / 2);

	win.setFrame(padding({height, width, x, y}, windowLocation.Top));
	win.clearUnmaximized();
});

onKey('down', hyper, () => {
	const win = Window.focused();
	if (!win) {
		return;
	}

	const {width, x} = win.frame();
	let {height, y} = win.screen().flippedVisibleFrame();
	height /= 2;
	[height, y] = [Math.ceil(height), y + Math.floor(height)];

	win.setFrame(padding({height, width, x, y}, windowLocation.Bottom));
	win.clearUnmaximized();
});

onKey('return', hyper, () => {
	const win = Window.focused();
	if (win) {
		win.toggleMaximized();
	}
});

onKey('u', hyper, () => {
	const win = Window.focused();
	if (!win) {
		return
	}

	const {width, height, x, y} = win.screen().flippedVisibleFrame()
	const frame = {
		width: Math.floor(width / 3),
		height: height,
		x,
		y,
	}

	win.setFrame(padding(frame, windowLocation.Left))
	win.clearUnmaximized();
})

onKey('i', hyper, () => {
	const win = Window.focused();
	if (!win) {
		return
	}

	const {width, height, x, y} = win.screen().flippedVisibleFrame()
	const frame = {
		width: Math.floor(width / 3),
		height: height,
		x: Math.floor(width / 3),
		y
	}

	win.setFrame(padding(frame, windowLocation.Middle));
	win.clearUnmaximized();
});

onKey('o', hyper, () => {
	const win = Window.focused();
	if (!win) {
		return
	}

	const {width, height, x, y} = win.screen().flippedVisibleFrame()
	const frame = {
		width: Math.floor(width / 3),
		height: height,
		x: 2 * Math.floor(width / 3),
		y,
	}

	win.setFrame(padding(frame, windowLocation.Right));
	win.clearUnmaximized();
});

onKey('j', hyper, () => {
	const win = Window.focused();
	if (!win) {
		return
	}

	const {width, height, x, y} = win.screen().flippedVisibleFrame()
	const frame = {
		width: Math.floor(width * 2/3),
		height: height,
		x,
		y,
	}

	win.setFrame(padding(frame, windowLocation.Left))
	win.clearUnmaximized();
})

onKey('k', hyper, () => {
	const win = Window.focused();
	if (!win) {
		return
	}

	const {width, height, x, y} = win.screen().flippedVisibleFrame()
	const frame = {
		height,
		width: Math.floor(width * 2/3),
		x: x + Math.floor((width * 1/3) / 2),
		y,
	}

	win.setFrame(padding(frame, windowLocation.Middle))
	win.clearUnmaximized();
})

onKey('l', hyper, () => {
	const win = Window.focused();
	if (!win) {
		return
	}

	const {width, height, x, y} = win.screen().flippedVisibleFrame()
	const frame = {
		width: Math.floor(width * 2/3),
		height: height,
		x: Math.floor(width / 3),
		y
	}

	win.setFrame(padding(frame, windowLocation.Right));
	win.clearUnmaximized();
});

onKey('c', hyper, () => {
	const win = Window.focused();
	if (!win) {
		return;
	}

	const {width, height} = win.frame();
	const {
		width: sWidth,
		height: sHeight,
		x,
		y,
	} = win.screen().flippedVisibleFrame();

	win.setFrame({
		height,
		width,
		x: x + sWidth / 2 - width / 2,
		y: y + sHeight / 2 - height / 2,
	});
});

onKey('p', hyperShift, () => {
	const win = Window.focused();
	if (!win) {
		return;
	}
	const app = win.app().name();
	const bundleId = win.app().bundleIdentifier();
	const pid = win.app().processIdentifier();
	const title = win.title();
	const frame = win.frame();
	const msg = [
		`Application: ${app}`,
		`Title: ${title}`,
		`Frame: X=${frame.x}, Y=${frame.y}`,
		`Size: H=${frame.height}, W=${frame.width}`,
		`Bundle ID: ${bundleId}`,
		`PID: ${pid}`,
	].join('\n');

	const modal = Modal.build({
		duration: 10,
		icon: win.app().icon(),
		text: msg,
		weight: 16,
	});
	modal.showCenterOn(Screen.main());
});

const phoenixApp = App.get('Phoenix');
titleModal('Phoenix (re)loaded!', 2, phoenixApp && phoenixApp.icon());
