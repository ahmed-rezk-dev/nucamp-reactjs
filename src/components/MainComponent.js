import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./HomeComponent";
import Directory from "./DirectoryComponent";
import { CAMPSITES } from "../shared/campsites";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Contact from "./ContactComponent";
import { COMMENTS } from "../shared/comments";
import { PARTNERS } from "../shared/partners";
import { PROMOTIONS } from "../shared/promotions";

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedCampsite: null,
			campsites: CAMPSITES,
			comments: COMMENTS,
			partners: PARTNERS,
			promotions: PROMOTIONS
		};
	}

	onCampsiteSelect(campsiteId) {
		this.setState({ selectedCampsite: campsiteId });
	}

	render() {
		const HomePage = () => {
			return (
				<Home
					campsite={
						this.state.campsites.filter(
							campsite => campsite.featured
						)[0]
					}
					promotion={
						this.state.promotions.filter(
							promotion => promotion.featured
						)[0]
					}
					partner={
						this.state.partners.filter(
							partner => partner.featured
						)[0]
					}
				/>
			);
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
					<Route exact path="/contactus" component={Contact} />
					<Redirect to="/home" />
				</Switch>
				<Footer />
			</>
		);
	}
}

export default Main;
