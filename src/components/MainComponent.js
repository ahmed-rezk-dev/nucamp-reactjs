import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./HomeComponent";
import Directory from "./DirectoryComponent";
import { CAMPSITES } from "../shared/campsites";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			campsites: CAMPSITES,
			selectedCampsite: null
		};
	}

	onCampsiteSelect(campsiteId) {
		this.setState({ selectedCampsite: campsiteId });
	}

	render() {
		const HomePage = () => {
			return <Home />;
		};
		return (
			<>
				<Header />
				<Switch>
					<Route path="/home" component={HomePage} />
					<Route
						exact
						path="/directory"
						render={() => (
							<Directory campsites={this.state.campsites} />
						)}
					/>
					<Redirect to="/home" />
				</Switch>
				<Footer />
			</>
		);
	}
}

export default Main;
