import React from 'react';

const Search = ({onChange}: {onChange?: (value?: string) => void}) => (
	<input
		className="input input-small"
		type="search"
		placeholder="Search by brand..."
		onChange={(event) => {
			onChange?.(event.target.value);
		}}
	/>
);

export default Search;
