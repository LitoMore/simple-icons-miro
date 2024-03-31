export async function init() {
	miro.board.ui.on('icon:click', async () => {
		await miro.board.ui.openPanel({
			url: 'app.html',
		});
	});

	miro.board.ui.on('drop', async ({x, y, target}) => {
		console.log('something was dropped', x, y, target);
		// Add svg to board
		const image = await miro.board.createImage({
			title: 'This is an image',
			url: 'https://miro.com/blog/wp-content/uploads/2023/10/Frame-12772209-1536x806.png',
			x: 0, // Default value: horizontal center of the board
			y: 0, // Default value: vertical center of the board
			width: 800, // Set either 'width', or 'height'
			rotation: 0,
		});

		console.log(image);
	});
}

// eslint-disable-next-line unicorn/prefer-top-level-await, @typescript-eslint/no-floating-promises
init();
