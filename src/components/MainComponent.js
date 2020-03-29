import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./HomeComponent";
import Directory from "./DirectoryComponent";
import { CAMPSITES } from "../shared/campsites";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Contact from "./ContactComponent";
import Aboutus from "./AboutComponent";
import CampsiteInfo from "./CampsiteInfoComponent";
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

		const CampsiteWithId = ({ match }) => {
			return (
				<CampsiteInfo
					campsite={
						this.state.campsites.filter(
							campsite => campsite.id === +match.params.campsiteId
						)[0]
					}
					comments={this.state.comments.filter(
						comment =>
							comment.campsiteId === +match.params.campsiteId
					)}
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
					<Route
						exact
						path="/aboutus"
						render={() => (
							<Aboutus partners={this.state.partners} />
						)}
					/>
					<Route
						path="/directory/:campsiteId"
						component={CampsiteWithId}
					/>
					<Redirect to="/home" />
				</Switch>
				<Footer />
			</>
		);
	}
}

export default Main;
