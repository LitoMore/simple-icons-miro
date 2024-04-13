import React from 'react';
import type {IconData} from '../types.js';
// Import {loadSvg} from '../utils.js';

const Icon = ({
	icon,
	luminance,
	version,
}: {
	icon: IconData;
	luminance: number;
	version: string;
}) => {
	const isWhite = icon.hex === 'FFFFFF';

	return (
		<button
			className={'si-icon miro-draggable draggable-item'}
			draggable={false}
			data-slug={icon.slug}
			data-title={icon.title}
			tabIndex={0}
			style={{
				border: `${isWhite ? 1 : 2}px solid ${
					isWhite
						? 'var(--figma-color-text, var(--fallback-color-text))'
						: `#${icon.hex}`
				}`,
				borderBottomWidth: isWhite ? 1 : 0,
				zIndex: 1,
			}}
			onClick={async () => {
				const viewport = await miro.board.viewport.get();
				const position = await miro.board.findEmptySpace({
					x: viewport.x + viewport.width / 2,
					y: viewport.y + viewport.height / 2,
					width: 24,
					height: 24,
				});
				const image = await miro.board.createImage({
					title: icon.title,
					alt: icon.title,
					url: `https://cdn.simpleicons.org/${icon.slug}`,
					width: 24,
					rotation: 0,
					x: position.x,
					y: position.y,
				});
				await miro.board.viewport.zoomTo(image);
			}}
		>
			<div
				className="si-icon-image"
				style={{
					backgroundColor: isWhite ? 'currentColor' : `#${icon.hex}`,
					WebkitMask: `url(https://cdn.jsdelivr.net/npm/simple-icons@${version}/icons/${icon.slug}.svg)`,
					WebkitMaskSize: 'contain',
					WebkitMaskRepeat: 'no-repeat',
					WebkitMaskPosition: 'center',
				}}
			/>
			<div className="si-icon-title">{icon.title}</div>
			<div
				className={`si-icon-color ${luminance < 0.4 ? 'light' : ''}`}
				style={{
					backgroundColor: `#${icon.hex}`,
				}}
			>
				#{icon.hex}
			</div>
		</button>
	);
};

export default Icon;
