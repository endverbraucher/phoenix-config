import task from '../task';

export default function osascript(script: string): Promise<string> {
	return task('/usr/bin/osascript', '-e', script)
		.then(t => t.output)
		.catch(err => {
			throw err;
		});
}
