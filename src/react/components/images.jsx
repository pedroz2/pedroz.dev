/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
 
export default class Images extends Component {
  constructor(props){
    super(props);
    this.state = {slideIndex: 0};
    this.minusSlides = this.minusSlides.bind(this);
    this.plusSlides = this.plusSlides.bind(this);
  }


  minusSlides(){
    if(this.state.slideIndex === 0){
      this.setState({slideIndex: this.props.images.length - 1});
    }
    else{
      this.setState({slideIndex: this.state.slideIndex - 1});
    }
  }

  plusSlides(){
    if(this.state.slideIndex === this.props.images.length - 1){
      this.setState({slideIndex: 0});
    }
    else{
      this.setState({slideIndex: this.state.slideIndex + 1});
    }
  }
  

  render() {
    const { slideIndex } = this.state;
    if(this.props.images.length === 1){
      return (
        <div className='card' style={{padding: '0', position: 'relative'}}>        
          <img className='card-image' src={this.props.images[0]} alt={this.props.images[0]}></img>
        </div>
      )
    }
    return (
      <div>
        { 
          this.props.images.map((image, idx) => (slideIndex === idx && (
            <div className='card' style={{padding: '0', position: 'relative'}}>
              <img className='card-image' src={image} alt={image}></img>
              <p className='numbertext'>{`${idx+1} / ${this.props.images.length}`}</p>     
              <a className='prev' onClick={this.minusSlides} style={{cursor: 'pointer'}}>&#10094;</a>
              <a className='next' onClick={this.plusSlides} style={{cursor: 'pointer'}}>&#10095;</a>  
            </div>
          ))
          
          )
        }  

      </div>
      
    );
  }
}