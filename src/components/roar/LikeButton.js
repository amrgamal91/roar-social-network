//done
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import CustomButton from "../../util/CustomButton";

// Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

// REdux
import { connect } from "react-redux";
import { likeRoar, unlikeRoar } from "../../redux/actions/dataAction";

export class LikeButton extends Component {
  likedRoar = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(like => like.roarId === this.props.roarId)
    )
      return true;
    else return false;
  };

  likeRoar = () => {
    this.props.likeRoar(this.props.roarId);
  };

  unlikeRoar = () => {
    this.props.unlikeRoar(this.props.roarId);
  };

  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <CustomButton tip="Like">
          <FavoriteBorder color="secondary" />
        </CustomButton>
      </Link>
    ) : this.likedRoar() ? (
      <CustomButton tip="Undo like" onClick={this.unlikeRoar}>
        <FavoriteIcon color="secondary" />
      </CustomButton>
    ) : (
      <CustomButton tip="Like" onClick={this.likeRoar}>
        <FavoriteBorder color="secondary" />
      </CustomButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  roarId: PropTypes.string.isRequired,
  likeRoar: PropTypes.func.isRequired,
  unlikeRoar: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  likeRoar,
  unlikeRoar
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LikeButton);
