import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

export default class CampsiteInfo extends Component {
	constructor(props) {
		super(props);
	}
	renderCampsite(campsite) {
		return (
			<div className="col-md-5 m-1">
				<Card>
					<CardImg top src={campsite.image} alt={campsite.name} />
					<CardBody>
						<CardTitle>{campsite.name}</CardTitle>
						<CardText>{campsite.description}</CardText>
					</CardBody>
				</Card>
			</div>
		);
	}

	// comments
	renderComments(comments) {
		if (comments) {
			return (
				<div className="col-md-5 m-1">
					<h4>Comments</h4>
					{comments.map((comment, key) => {
						return (
							<div key={key.toString()}>
								<p>{comment.text}</p>
								<p>
									--{comment.author},
									{new Intl.DateTimeFormat("en-US", {
										year: "numeric",
										month: "short",
										day: "2-digit"
									}).format(
										new Date(Date.parse(comment.date))
									)}
								</p>
							</div>
						);
					})}
				</div>
			);
		}
		return <div />;
	}

	render() {
		const { campsite } = this.props;
		return (
			<>
				{campsite ? (
					<div className="container">
						<div className="row">
							{this.renderCampsite(campsite)}
							{this.renderComments(campsite.comments)}
						</div>
					</div>
				) : (
					<div />
				)}
			</>
		);
	}
}
