import React from "react";
import NavBar from "./NavBar";
import "../styles/main.css";

const Layout = props => {
	return (
		<React.Fragment>
			<NavBar />
			{props.children}
		</React.Fragment>
	);
};

export default Layout;
