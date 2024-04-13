import React, {useState, useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import Search from './components/search.js';
import Icons from './components/icons.js';
import Loading from './components/loading.js';
import type {IconData} from './types.js';
import {loadLatestVersion, loadJson, titleToSlug} from './utils.js';
import './assets/style.css';

const App = () => {
	const [searchString, setSearchString] = useState('');
	const [icons, setIcons] = useState<IconData[]>([]);
	const [version, setVersion] = useState<string>('latest');

	useEffect(() => {
		(async () => {
			const version = await loadLatestVersion();
			const json = await loadJson(version);
			const icons = json.icons.map((icon) => ({
				...icon,
				slug: icon.slug || titleToSlug(icon.title),
			}));
			setIcons(icons);
			setVersion(version);
		})();
	}, []);

	useEffect(() => {
		miro.board.ui.on('drop', async ({x, y, target}) => {
			const {slug, title} = target.dataset;

			if (target && slug) {
				await miro.board.createImage({
					title,
					alt: title,
					url: `https://cdn.simpleicons.org/${slug}`,
					width: 24,
					rotation: 0,
					x,
					y,
				});
			}
		});
	}, []);

	return (
		<>
			<div className="grid">
				<div className="cs1 ce12">
					<Search
						onChange={(value = '') => {
							setSearchString(value);
						}}
					/>
					{icons.length > 0 ? (
						<Icons
							searchString={searchString}
							icons={icons}
							version={version}
						/>
					) : (
						<Loading />
					)}
				</div>
			</div>
			<div
				style={{
					display: 'flex',
					position: 'fixed',
					left: 0,
					bottom: 0,
					height: 30,
					backgroundColor: 'white',
					width: '100%',
					justifyContent: 'end',
					alignItems: 'center',
					padding: '0 30px',
					opacity: 0.9,
				}}
			>
				<a
					rel="noopener noreferrer"
					target="_blank"
					href="https://github.com/simple-icons/simple-icons/issues"
				>
					<span
						className="icon icon-comment-feedback"
						style={{
							cursor: 'pointer',
							filter:
								'invert(78%) sepia(3%) saturate(20%) hue-rotate(71deg) brightness(85%) contrast(93%)',
						}}
					></span>
				</a>
			</div>
		</>
	);
};

const container = document.querySelector('#root');
const root = createRoot(container as HTMLDivElement);
root.render(<App />);
