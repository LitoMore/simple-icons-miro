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

	return (
		<div className="grid">
			<div className="cs1 ce12">
				<Search
					onChange={(value = '') => {
						setSearchString(value);
					}}
				/>
				{icons.length > 0 ? (
					<Icons searchString={searchString} icons={icons} version={version} />
				) : (
					<Loading />
				)}
			</div>
		</div>
	);
};

const container = document.querySelector('#root');
const root = createRoot(container as HTMLDivElement);
root.render(<App />);
