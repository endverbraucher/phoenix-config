import { padding as paddingSize } from '../config'

export { padding, windowLocation }

enum windowLocation {
	Left,
	Middle,
	Right,
	Top,
	Bottom,
	FullScreen
}

function padding(frame: Rectangle, location: windowLocation): Rectangle {
	return {
		width: getWidthWithPadding(frame.width, location),
		height: getHeightWithPadding(frame.height, location),
		x: getXwithPadding(frame.x, location),
		y: getYwithPadding(frame.y, location)
	}
}

function getHeightWithPadding(height:number, location: windowLocation): number {
	switch (location) {
		case windowLocation.Top:
		case windowLocation.Bottom:
			return height - Math.floor(1.5 * paddingSize)
		default:
			return height - 2 * paddingSize
	}
}

function getWidthWithPadding (width: number, location: windowLocation): number {
	switch (location) {
		case windowLocation.Left:
		case windowLocation.Right:
			return width - Math.floor(1.5 * paddingSize)
		case windowLocation.Middle:
			return width - paddingSize
		default:
			return width
	}
}

function getXwithPadding (x: number, location: windowLocation): number {
	switch (location) {
		case windowLocation.Left:
			return x + paddingSize
		case windowLocation.Middle:
		case windowLocation.Right:
			return x + Math.floor(paddingSize / 2)
		default:
			return x
	}
}

function getYwithPadding (y: number, location: windowLocation): number {
	switch (location) {
		case windowLocation.Bottom:
			return y + paddingSize / 2
		default:
			return y + paddingSize
	}
}
