import { frameRatio, sizeMatches } from './calc';
import log from './logger';

export { toggleMaximized, clearUnmaximized };

interface FrameCache {
	screen: Rectangle;
	window: Rectangle;
}

const frameCache: Map<number, FrameCache> = new Map();

Event.on('windowDidClose', (win: Window) => {
	// Cleanup references to unmaximized window frames
	frameCache.delete(win.hash());
});

function clearUnmaximized(win: Window) {
	frameCache.delete(win.hash());
}

function unmaximizedFrame(win: Window): Rectangle {
	let c = frameCache.get(win.hash());
	if (!c) {
		c = {
			screen: win.screen().flippedVisibleFrame(),
			window: win.frame(),
		};
	}
	const ratio = frameRatio(c.screen, win.screen().flippedVisibleFrame());
	return ratio(c.window);
}

function toggleMaximized(win: Window) {
	const id = win.hash();
	if (frameCache.has(id)) {
		win.setFrame(unmaximizedFrame(win));
		win.clearUnmaximized();
	} else {
		frameCache.set(id, {
			screen: win.screen().flippedVisibleFrame(),
			window: win.frame(),
		});
		win.maximize();
	}
}

Window.prototype.clearUnmaximized = function _clearUnmaximized() { clearUnmaximized(this); };
Window.prototype.toggleMaximized = function _toggleMaximized() { toggleMaximized(this); };

// FIXME: This is too hacky, I'd prefer not to monkey patch built-ins
const setFrameOrig = Window.prototype.setFrame;
Window.prototype.setFrame = function _setFrame(frame: Rectangle): boolean {
	let ret = setFrameOrig.call(this, frame);
	if (this.app().bundleIdentifier() === 'com.microsoft.Word') {
		// Workaround for Microsoft Word resizing too slowly and thus not
		// reaching the correct frame
		while (!sizeMatches(this.frame(), frame)) {
			log('com.microsoft.Word workaround triggered, reapplying setFrame()');
			ret = setFrameOrig.call(this, frame);
		}
	}
	return ret;
};
