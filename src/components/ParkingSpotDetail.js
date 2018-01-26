import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SingleDatePicker } from 'react-dates';

import { getParkingSpot } from '../actions/parkingSpots';
import { postNewListing } from '../actions/reservations';

class ParkingSpotDetail extends Component{
  constructor(props){
    super(props);

    this.state = {
      review: "",
      date: null,
      focusedInput: null,
    }
  }

  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  onClick = (event) => {
    let moment = require('moment');
    let x = moment(this.state.date).format('LL')
    let newRes = {
      date: x,
      guest_id: this.props.user.currentUser.id,
      parking_spot_id: this.props.parkingSpot.detail.id,
      status: "pending"
    }
    this.props.postNewListing(newRes)
    this.props.history.push('/confirmation')
  }


  componentDidMount(){
    const parkingSpotId = this.props.location.pathname.split("/")[2]
    this.props.getParkingSpot(parkingSpotId)
  }

  render(){
    let mapAddress = ""
    if (this.props.parkingSpot.detail.address) {
      let address = this.props.parkingSpot.detail.address.split(" ").join("+")
      let city = this.props.parkingSpot.detail.city
      let state = this.props.parkingSpot.detail.state
      let zip = this.props.parkingSpot.detail.zip
      mapAddress = `https://www.google.com/maps/embed/v1/place?key=AIzaSyCNUIlhwaQ4xLbNM5Qs2of7wx7pcw8yjaM&q=${address},${city}+${state}+${zip}`
    }


    var moment = require('moment');
    const BAD_DATES = [];
    const isDayBlocked = day => BAD_DATES.filter(d => moment(d).isSame(day, 'day')).length > 0
    if (this.props.parkingSpot.unavailableDates !== null ) {
     this.props.parkingSpot.unavailableDates.filter(dates => dates.status !== "denied").map((dates) => BAD_DATES.push(dates.date))
   }

   let reviews = ""

    if (this.props.parkingSpot.reviews !== null ) {
      reviews = this.props.parkingSpot.reviews.map((each) => (<li key={each.id}>{each.review}</li>))
    }


    return(
      <div className="container pageMargin">

        <div className="card">
          <div className="ui header"><h1>{this.props.parkingSpot.detail.title}</h1></div>
          <img className="divImg" src={this.props.parkingSpot.detail.photo} alt=""/>
      </div>


      <div className="row">
        <div className="col-sm-6">
          <div className="card">
            <div className="content">
              <h1>Detail</h1>
              <div className="ui rating" data-rating="3" data-max-rating="5"></div>
              <div className="ui star rating" data-rating="4"></div>
              <div className="description">Description: {this.props.parkingSpot.detail.description}</div>
              <div className="description">Rating: {this.props.parkingSpot.detail.rating}</div>
              <div className="description">Address: {this.props.parkingSpot.detail.address}</div>
              <div className="description">Price: ${this.props.parkingSpot.detail.price}</div>
              <div className="description">Cancellation: Full refund up to 7 days before reservation. </div>
              <div className="description">Amenities: Electric Car charger included. </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6">
          <div className="card">
            <h1 className="ui header">Availability</h1>
            <div className="content">
              <SingleDatePicker
                numberOfMonths={1}
                isDayBlocked={isDayBlocked}
                date={this.state.date}
                onDateChange={date => this.setState({ date })}
                focused={this.state.focused}
                onFocusChange={({ focused }) => this.setState({ focused })}
              />
              {localStorage.getItem('jwt') ? <div onClick={this.onClick} className="ui primary button right floated content">Request Reservation</div> : <div className="right floated content">Please Log In Or SignUp to Book</div>}
            </div>
          </div>
        </div>
      </div>


      <div className="card">
        <iframe
          title="map"
          width="100%"
          height="700px"
          src={mapAddress}>
        </iframe>
      </div>


      <div className="card">
        <h1>Reviews</h1>
        <ul className="list">
          {reviews}
        </ul>
        {localStorage.getItem('jwt') ?
          <form className="ui reply form">
            <div className="field">
              <textarea type="text" name="review" placeholder="Please write your review..." onChange={this.onChange} value={this.state.city}/>
            </div>
            <button className="btn-primary blue">Add Review</button>
          </form>: null}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    parkingSpot: state.parkingSpots,
    user: state.user
  }
}

function mapDispatchToProps(dispatch){
  return  bindActionCreators({getParkingSpot, postNewListing}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ParkingSpotDetail);
