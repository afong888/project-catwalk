/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateStyle } from '../reducers/Style-Reducer';

const Style = ({ style }) => {
  const dispatch = useDispatch();
  const styleId = style.style_id;

  const handleClick = () => {
    console.log(styleId);
    // dispatch(updateStyleId(styleId));
    dispatch(updateStyle(style));
  };

  const selectedStyleId = useSelector((state) => state.style.id);

  return (
    <span data-testid="click-style" role="button" tabIndex="-1" onClick={handleClick} onKeyPress={handleClick}>
      <img
        className={style.style_id === selectedStyleId ? 'style-selected' : 'style-unselected'}
        src={style.photos[0].thumbnail_url}
        alt={style.name}
        title={style.name}
      />
      <p className="style-name">{style.name}</p>
    </span>
  );
};

export default Style;
