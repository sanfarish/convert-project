import { useEffect } from "react";

function Title(title) {
	useEffect(() => {
		document.title = title;
	}, [title]);
};

export default Title;