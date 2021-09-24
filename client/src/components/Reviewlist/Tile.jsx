import React from 'react';
import moment from 'moment';

const tile = (props) => (
  <div className="RLtile">
    <p className="review-title">
      stars placeholder
      <span className="RLidentity">
        {props.review.reviewer_name}
        ,&nbsp;
        {moment(props.review.date).format('LL')}
      </span>
    </p>
    <p className="review-summary">
      <b>{props.review.summary}</b>
    </p>
    <p className="review-body">
      {props.review.body}
    </p>
  </div>
);

export default tile;
