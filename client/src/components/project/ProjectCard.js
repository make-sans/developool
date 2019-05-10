import React from 'react';
import InterestSkillList from './InterestSkillList';
import { Link } from 'react-router-dom';

export default function ProjectCard(props) {
  const { project } = props;
  return (
    <div className="card mb-4 shadow-sm rounded" key={project._id}>
      <div className="card-body">
        <div className="d-flex align-items-center">
          <h3 className="font-weight-lighter mr-2">{project.title}</h3>
          <p className="text-muted m-0 mr-1">· by</p>
          <Link
            className={'text-muted m-0 mr-3'}
            to={`/profile/${project.owner.id}`}
          >
            {project.owner.username}
          </Link>
        </div>
        <p className="card-text">{project.publicDescription}</p>
        <InterestSkillList
          list={project.skills}
          customStyle={'skill-list-item'}
        />
        <InterestSkillList
          list={project.interests}
          customStyle={'interest-list-item'}
        />
        <Link to={'/project/' + project._id} className="btn btn-primary">
          Project page
        </Link>
      </div>
    </div>
  );
}
