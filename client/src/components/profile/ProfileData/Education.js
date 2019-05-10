import React from 'react';
import Moment from 'react-moment';

export default function Education(props) {
  const {
    instituteName,
    degree,
    fieldOfStudy,
    fromDate,
    endDate,
    description
  } = props.edu;
  const { isRemovable, onRemoveClick, i } = props;

  return (
    <div className="card">
      <div className="card-body">
        {isRemovable && (
          <i
            onClick={() => onRemoveClick(i)}
            className="fas fa-times hover float-right"
          />
        )}
        <h5 className="card-title">{instituteName}</h5>
        <h6 className="card-subtitle mb-2 semibold">{`${degree}, ${fieldOfStudy}`}</h6>
        <h6 className="card-subtitle mb-2 light">
          <Moment format="DD/MM/YYYY">{fromDate}</Moment>
          {' - '}
          <Moment format="DD/MM/YYYY">{endDate}</Moment>
        </h6>
        <p className="card-text">{description}</p>
      </div>
    </div>
  );
}
