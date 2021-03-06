const baseUrl = "https://parallelp-server.herokuapp.com"
// const testServer = "http://localhost:3000"

function fetchingSpots() {
  return {
    type: "FETCHING_SPOTS"
  }
}

function fetchedSpots(parkingSpots) {
  return {
    type: "FETCHED_SPOTS",
    payload: parkingSpots
  }
}

function addNewListing(newListing){
  return {
    type: "ADD_NEW_LISTING",
    payload: newListing
  }
}

export function fetchParkingSpots(){
  return function(dispatch){
    dispatch(fetchingSpots())
    fetch(`${baseUrl}/api/v1/parking_spots`)
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchedSpots(json))
      })
    }
  }


export function postNewListing(listingParams) {
  const body = JSON.stringify(listingParams)
  return function(dispatch){
    fetch(`${baseUrl}/api/v1/newparkingspot`, {
      method: 'post',
      body: body,
      headers: {
        "Accept":"application/json",
        "Content-Type":"application/json"
        }
    })
    .then((res) => res.json())
    .then((json) => {
      dispatch(addNewListing(json))
    })
  }
}

export function getParkingSpot(id){
  return function(dispatch){
    fetch(`${baseUrl}/api/v1/parking_spots/${id}`)
    .then(res => res.json())
    .then(json => {
        dispatch({type: "GET_PARKING_SPOT", payload: json})
    })
  }
}


export function filterBy(type) {
  return function(dispatch) {
    dispatch({type: "FILTER_BY", payload: type})
  }
}

export function sortBy(type) {
  return function(dispatch) {
    dispatch({type: "SORT_BY", payload: type})
  }
}


export function getFilterByZip(zip){
  const body = JSON.stringify(zip)
  return async function(dispatch) {
    dispatch(fetchingSpots())
    let data = await (await fetch(`${baseUrl}/api/v1/filterbyzip`,{
      method: 'post',
      body: body,
      headers: {
        "Accept":"application/json",
        "Content-Type":"application/json"
      }
    })).json()
    dispatch(fetchedSpots(data))
  }
}
