import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import Loading from "./LoadingComponent";
import { baseUrl } from "../shared/baseURL";
import { FadeTransform } from "react-animation-components";

function RenderCard({ item, isLoading, errors }) {
  if (isLoading) {
    return <Loading />;
  }
  if (errors) {
    return <h4>{errors}</h4>;
  }

  return (
    <FadeTransform
      in
      transformProps={{ exitTransform: "scale(0.5) translateY(-50%)" }}
    >
      <Card>
        <CardImg src={baseUrl + item.image} />
        <CardBody>
          <CardTitle>{item.name}</CardTitle>
          {item.designation ? (
            <CardSubtitle>{item.designation}</CardSubtitle>
          ) : null}
          <CardText>{item.description}</CardText>
        </CardBody>
      </Card>
    </FadeTransform>
  );
}
function Home(props) {
  return (
    <div className="container">
      <div className="row align-items-start">
        <div className="col-12 col-md m-1">
          <RenderCard
            item={props.dish}
            isLoading={props.dishesLoading}
            errors={props.dishesErrors}
          />
        </div>

        <div className="col-12 col-md m-1">
          <RenderCard item={props.promotion} />
        </div>

        <div className="col-12 col-md m-1">
          <RenderCard item={props.leader} />
        </div>
      </div>
    </div>
  );
}

export default Home;
