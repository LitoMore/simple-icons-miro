import React, {useMemo, forwardRef} from 'react';
import styled from 'styled-components'; // eslint-disable-line import/no-named-as-default
import getRelativeLuminance from 'get-relative-luminance';
import {Searcher} from 'fast-fuzzy';
import {VirtuosoGrid} from 'react-virtuoso';
import type {IconData} from '../types.js';
import Icon from './icon.js';

const ListContainer = styled.div<{gap: number}>`
	display: flex;
	flex-wrap: wrap;
	gap: ${({gap}) => gap}px;
	margin: 10px 0 0 0;
`;

const Icons = ({
	searchString = '',
	icons,
	version,
}: {
	searchString?: string;
	icons: IconData[];
	version: string;
}) => {
	const searcher = new Searcher(icons, {
		keySelector(icon) {
			return [
				icon.title,
				icon.slug,
				icon.aliases?.aka,
				icon.aliases?.dup?.map((duplicate) => duplicate.title),
				Object.values(icon.aliases?.loc ?? {}),
			]
				.flat()
				.filter(Boolean) as string[];
		},
	});
	const searchResult = searchString ? searcher.search(searchString) : icons;
	const luminanceMap = useMemo(
		() =>
			new Map(
				[...new Set(icons.map((icon) => icon.hex))].map((hex) => [
					hex,
					getRelativeLuminance(`#${hex}`),
				]),
			),
		[icons],
	);

	const rootSpace = 24;
	const siIconBoxWidth = 100;
	const windowWidth = window.innerWidth;

	const containerWidth = windowWidth - rootSpace * 2;
	const iconsPerRow = Math.floor(containerWidth / siIconBoxWidth);
	const gap =
		(containerWidth - iconsPerRow * siIconBoxWidth) / (iconsPerRow - 1);

	return (
		<VirtuosoGrid
			style={{height: window.innerHeight}}
			totalCount={searchResult.length}
			overscan={100}
			components={{
				List: forwardRef(({children, style}, reference) => (
					<ListContainer ref={reference} style={style} gap={gap}>
						{children}
					</ListContainer>
				)),
			}}
			itemContent={(index) => {
				const icon = searchResult[index];
				return (
					<Icon
						key={icon.slug}
						icon={icon}
						luminance={Number(luminanceMap.get(icon.hex))}
						version={version}
					/>
				);
			}}
		/>
	);
};

export default Icons;
