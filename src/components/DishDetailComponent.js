import React, { useState } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Col,
  Label,
  Button,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Link } from "react-router-dom";
import Loading from "./LoadingComponent";
import { baseUrl } from "../shared/baseURL";
import { FadeTransform, Fade, Stagger } from "react-animation-components";

function RenderDish(props) {
  const dish = props.dish;
  if (dish != null) {
    return (
      <>
        <div className="col-12 col-md-4 m-1">
          <FadeTransform
            in
            transformProps={{ exitTransform: "scale(0.5) translateY(-50%)" }}
          >
            <Card>
              <CardImg
                width="100%"
                src={baseUrl + dish.image}
                alt={dish.name}
              />

              <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
              </CardBody>
            </Card>
          </FadeTransform>
        </div>
      </>
    );
  } else {
    return <div></div>;
  }
}

function CommentForm(props) {
  function handleSubmit(values) {
    // alert(JSON.stringify(values));
    toggleModal();
    props.postComment(
      props.dishId,
      values.rating,
      values.author,
      values.comment
    );
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <>
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Login</ModalHeader>
        <ModalBody>
          <LocalForm onSubmit={handleSubmit}>
            <Row className="form-group">
              <Label for="author" md={2}>
                Name
              </Label>
              <Col md={10}>
                <Control.text
                  model=".author"
                  className="form-control"
                  id="author"
                  name="author"
                  placeholder="Name"
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Label for="rating" md={2}>
                Rating
              </Label>
              <Col md={10}>
                <Control.text
                  model=".rating"
                  className="form-control"
                  id="rating"
                  name="rating"
                  placeholder="rating"
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Label for="comment" md={2}>
                Name
              </Label>
              <Col md={10}>
                <Control.textarea
                  row="12"
                  model=".comment"
                  className="form-control"
                  id="comment"
                  name="comment"
                />
              </Col>
            </Row>

            <Button type="submit" value="submit" className="bg-primary">
              Submit
            </Button>
          </LocalForm>
        </ModalBody>
      </Modal>
      <Button outline onClick={toggleModal}>
        Add Comment
      </Button>
    </>
  );
}
function RenderDishComments(props) {
  return (
    <div className="col-12 col-md-5 m-1">
      <div className="container">
        <CommentForm dishId={props.dishId} postComment={props.postComment} />
        <h4>Comments</h4>
        <ul className="list-unstyled">
          <Stagger in>
            {props.comments.map((comment) => {
              return (
                <Fade in>
                  <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>
                      -- {comment.author}, {comment.date}
                    </p>
                  </li>
                </Fade>
              );
            })}
          </Stagger>
        </ul>
      </div>
    </div>
  );
}

function DishDetail(props) {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }
  if (props.errors) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errors}</h4>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name} </BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dish.name}</h3>
          <hr />
        </div>
      </div>

      <div className="row">
        <RenderDish dish={props.dish} />{" "}
        <RenderDishComments
          comments={props.comments}
          postComment={props.postComment}
          dishId={props.dish.id}
        />{" "}
      </div>
    </>
  );
}

export default DishDetail;
