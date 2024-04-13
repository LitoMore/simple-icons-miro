export async function init() {
	miro.board.ui.on('icon:click', async () => {
		await miro.board.ui.openPanel({
			url: 'app.html',
		});
	});
}

// eslint-disable-next-line unicorn/prefer-top-level-await, @typescript-eslint/no-floating-promises
init();
