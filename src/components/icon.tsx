import React from 'react';
import type {IconData} from '../types.js';
// Import {loadSvg} from '../utils.js';

const Icon = ({
	className,
	icon,
	luminance,
	version,
}: {
	className?: string;
	icon: IconData;
	luminance: number;
	version: string;
}) => {
	const isWhite = icon.hex === 'FFFFFF';

	return (
		<div
			className={`si-icon ${className ?? ''}`}
			style={{
				border: `${isWhite ? 1 : 2}px solid ${
					isWhite
						? 'var(--figma-color-text, var(--fallback-color-text))'
						: `#${icon.hex}`
				}`,
				borderBottomWidth: isWhite ? 1 : 0,
			}}
			onClick={async () => {
				const viewport = await miro.board.viewport.get();
				await miro.board.createImage({
					title: 'This is an image',
					url: `https://cdn.simpleicons.org/${icon.slug}`,
					width: 24,
					rotation: 0,
					x: viewport.x + viewport.width / 2,
					y: viewport.y + viewport.height / 2,
				});
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
		</div>
	);
};

export default Icon;
