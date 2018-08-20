import './screen';
import './window';

import {frameRatio} from './calc';
import {hyper, hyperShift} from './config';
import {onKey} from './key';
import {titleModal} from './modal';
import { padding } from './misc/padding';

Phoenix.set({
	daemon: true,
	openAtLogin: true,
});

onKey(['left', 'j'], hyper, () => {
	const win = Window.focused();
	if (!win) {
		return;
	}

	const {width, height, x, y} = win.screen().flippedVisibleFrame()

	const frame = {width: Math.floor(width / 2), height, x, y}
	win.setFrame(padding(frame));
	win.clearUnmaximized();
});

onKey(['right', 'l'], hyper, () => {
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

	win.setFrame(padding(frame));
	win.clearUnmaximized();
});

onKey(['up', 'i'], hyper, () => {
	const win = Window.focused();
	if (!win) {
		return;
	}

	const {width, x} = win.frame();
	let {height, y} = win.screen().flippedVisibleFrame();
	height = Math.ceil(height / 2);

	win.setFrame(padding({height, width, x, y}));
	win.clearUnmaximized();
});

onKey(['down', 'k'], hyper, () => {
	const win = Window.focused();
	if (!win) {
		return;
	}

	const {width, x} = win.frame();
	let {height, y} = win.screen().flippedVisibleFrame();
	height /= 2;
	[height, y] = [Math.ceil(height), y + Math.floor(height)];

	win.setFrame(padding({height, width, x, y}));
	win.clearUnmaximized();
});

onKey('return', hyper, () => {
	const win = Window.focused();
	if (win) {
		win.toggleMaximized();
	}
});

onKey('return', hyperShift, () => {
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

	win.setFrame(padding({
		height,
		width,
		x: x + sWidth / 2 - width / 2,
		y: y + sHeight / 2 - height / 2,
	}));
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
