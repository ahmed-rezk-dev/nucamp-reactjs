import React, { Component } from "react";
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	Breadcrumb,
	BreadcrumbItem,
	Button,
	Modal,
	ModalBody,
	ModalHeader,
	Row,
	Col,
	Label,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Link } from "react-router-dom";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

function RenderCampsite({ campsite }) {
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
function RenderComments({ comments, addComment, campsiteId }) {
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
									day: "2-digit",
								}).format(new Date(Date.parse(comment.date)))}
							</p>
						</div>
					);
				})}
				<CommentForm campsiteId={campsiteId} addComment={addComment} />
			</div>
		);
	}
	return <div />;
}

// Comment Form
class CommentForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isModalOpen: false,
		};

		this.toggleModal = this.toggleModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	toggleModal() {
		this.setState({
			isModalOpen: !this.state.isModalOpen,
		});
	}

	handleSubmit(values) {
		this.toggleModal();
		this.props.addComment(
			this.props.campsiteId,
			values.rating,
			values.author,
			values.text
		);
	}
	render() {
		return (
			<>
				<Modal
					isOpen={this.state.isModalOpen}
					toggle={this.toggleModal}
				>
					<ModalHeader toggle={this.toggleModal}>
						Submit Comment
					</ModalHeader>
					<ModalBody>
						<LocalForm
							onSubmit={(values) => this.handleSubmit(values)}
						>
							<Row className="form-group">
								<Col>
									<Label htmlFor="rating">Rating</Label>
									<Control.select
										model=".rating"
										id=".rating"
										name="rating"
										className="form-control"
									>
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4</option>
										<option value="5">5</option>
									</Control.select>
								</Col>
							</Row>

							<Row className="form-group">
								<Col>
									<Label htmlFor="yourname">Your Name</Label>
									<Control.text
										model=".yourname"
										id="yourname"
										name="yourname"
										placeholder="Your Name"
										className="form-control"
										validators={{
											required,
											minLength: minLength(2),
											maxLength: maxLength(15),
										}}
									/>
									<Errors
										className="text-danger"
										model=".yourname"
										show="touched"
										component="div"
										messages={{
											required: "Required",
											minLength:
												"Must be at least 2 characters",
											maxLength:
												"Must be 15 characters or less",
										}}
									/>
								</Col>
							</Row>

							<Row className="form-group">
								<Col>
									<Label htmlFor="comment">Comment</Label>
									<Control.textarea
										model=".comment"
										id="comment"
										name="comment"
										rows="12"
										className="form-control"
									/>
								</Col>
							</Row>
							<Row className="form-group">
								<Col>
									<Button type="submit" color="primary">
										Submit
									</Button>
								</Col>
							</Row>
						</LocalForm>
					</ModalBody>
				</Modal>
				<Button outline color="secondary" onClick={this.toggleModal}>
					<i className="fa fa-edit"></i> Submit Comment
				</Button>
			</>
		);
	}
}

function CompsiteInfo({ campsite, comments, addComment }) {
	return (
		<>
			{campsite ? (
				<div className="container">
					<div className="row">
						<div className="col">
							<Breadcrumb>
								<BreadcrumbItem>
									<Link to="/directory">Directory</Link>
								</BreadcrumbItem>
								<BreadcrumbItem active>
									{campsite.name}
								</BreadcrumbItem>
							</Breadcrumb>
							<h2>{campsite.name}</h2>
							<hr />
						</div>
					</div>
					<div className="row">
						<RenderCampsite campsite={campsite} />
						<RenderComments
							comments={comments}
							addComment={addComment}
							campsiteId={campsite.id}
						/>
					</div>
					{/* <div className="row">
						<div className="col-md-5 m-1">
							<CommentForm />
						</div>
					</div> */}
				</div>
			) : (
				<div />
			)}
		</>
	);
}

export default CompsiteInfo;
