import React, { Component } from 'react';
import { IconGitHub, IconVideo, IconLink } from './../icons';

class Card extends Component {
  state = {};
  render() {
    const {
      title,
      detail,
      tech,
      img,
      color,
      github,
      video,
      link,
    } = this.props.project;
    return (
      <div className='card'>
        <div className='card-content'>
          <h1 className={`accent-${color}`}>{title}</h1>
          <ul className='tags'>
            {tech.map((d) => (
              <li>{d}</li>
            ))}
          </ul>
          <p>{detail}</p>
        </div>

        <div className='icons'>
          {github && (
            <a href={github} target='_blank' rel='noopener noreferrer'>
              <IconGitHub />
            </a>
          )}
          {video && (
            <a href={video} target='_blank' rel='noopener noreferrer'>
              <IconVideo />
            </a>
          )}
          {link && (
            <a href={link} target='_blank' rel='noopener noreferrer'>
              <IconLink />
            </a>
          )}
        </div>
      </div>
    );
  }
}

export default Card;
