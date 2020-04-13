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
import { FadeTransform, Fade, Stagger } from "react-animation-components";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

function RenderCampsite({ campsite }) {
	return (
		<div className="col-md-5 m-1">
			<FadeTransform
				in
				transformProps={{
					exitTransform: "scale(0.5) translateY(-50%)",
				}}
			>
				<Card>
					<CardImg
						top
						src={baseUrl + campsite.image}
						alt={campsite.name}
					/>
					<CardBody>
						<CardTitle>{campsite.name}</CardTitle>
						<CardText>{campsite.description}</CardText>
					</CardBody>
				</Card>
			</FadeTransform>
		</div>
	);
}

// comments
function RenderComments({ comments, postComment, campsiteId }) {
	if (comments) {
		return (
			<div className="col-md-5 m-1">
				<h4>Comments</h4>
				<Stagger in>
					{comments.map((comment) => {
						return (
							<Fade in key={comment.id}>
								<div>
									<p>
										{comment.text}
										<br />
										-- {comment.author},{" "}
										{new Intl.DateTimeFormat("en-US", {
											year: "numeric",
											month: "short",
											day: "2-digit",
										}).format(
											new Date(Date.parse(comment.date))
										)}
									</p>
								</div>
							</Fade>
						);
					})}
				</Stagger>
				<CommentForm
					campsiteId={campsiteId}
					postComment={postComment}
				/>
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
		this.props.postComment(
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
										model=".author"
										id="yourname"
										name="author"
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
										model=".author"
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
										model=".text"
										id="comment"
										name="text"
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

function CompsiteInfo({ campsite, comments, postComment, isLoading, errMess }) {
	if (isLoading) {
		return (
			<div className="container">
				<div className="row">
					<Loading />
				</div>
			</div>
		);
	}
	if (errMess) {
		return (
			<div className="container">
				<div className="row">
					<div className="col">
						<h4>{errMess}</h4>
					</div>
				</div>
			</div>
		);
	}
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
							postComment={postComment}
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
