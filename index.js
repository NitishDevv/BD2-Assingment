const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const hotels = require('./hotels');

const app = express();
const port = 3000;

app.use(cors());

let hotelCopy = hotels.slice();

// Get hotels sorted

function getAscSortedHotelsByPrice(hotel1, hotel2) {
  return hotel1.price - hotel2.price;
}
function getDescSortedHotelsByPrice(hotel1, hotel2) {
  return hotel2.price - hotel1.price;
}

function getAscSortedHotelsByRating(hotel1, hotel2) {
  return hotel1.rating - hotel2.rating;
}
function getDescSortedHotelsByRating(hotel1, hotel2) {
  return hotel2.rating - hotel1.rating;
}

function getAscSortedHotelsByReviews(hotel1, hotel2) {
  return hotel1.reviews - hotel2.reviews;
}
function getDescSortedHotelsByReviews(hotel1, hotel2) {
  return hotel2.reviews - hotel1.reviews;
}

app.get('/hotels/sort/:priceSortParam', (req, res) => {
  let sortParam = req.params.priceSortParam;
  let pricing = req.query.pricing;
  let rating = req.query.rating;
  let reviews = req.query.reviews;
  let sortedHotels;
  console.log(sortParam, pricing, rating);
  if (pricing) {
    if (pricing === 'low-to-high') {
      sortedHotels = hotelCopy.sort(getAscSortedHotelsByPrice);
    } else if (pricing === 'high-to-low') {
      sortedHotels = hotelCopy.sort(getDescSortedHotelsByPrice);
    }
  } else if (rating) {
    if (rating === 'low-to-high') {
      sortedHotels = hotelCopy.sort(getAscSortedHotelsByRating);
    } else if (rating === 'high-to-low') {
      sortedHotels = hotelCopy.sort(getDescSortedHotelsByRating);
    }
  } else if (reviews) {
    if (reviews === 'least-to-most') {
      sortedHotels = hotelCopy.sort(getAscSortedHotelsByReviews);
    } else if (reviews === 'most-to-least') {
      console.log('Hi', rating);
      sortedHotels = hotelCopy.sort(getDescSortedHotelsByReviews);
    }
  }

  res.send({ hotels: sortedHotels });
});

// Get hotels filtered

function filterHotelsByAmenity(hotel, amenity) {
  console.log(amenity);
  return hotel.amenity.toLowerCase() === amenity.toLowerCase();
}

function filterHotelsByCountry(hotel, country) {
  console.log(country);
  return hotel.country.toLowerCase() === country.toLowerCase();
}

function filterHotelsByCategory(hotel, category) {
  console.log(category);
  return hotel.category.toLowerCase() === category.toLowerCase();
}

app.get('/hotels/filter/:filterBy', (req, res) => {
  let filteredHotels;
  let filterType = req.params.filterBy;
  let filterByAmenity = req.query.amenity;
  let filterByCountry = req.query.country;
  let filterByCategory = req.query.category;

  if (filterType === 'amenity') {
    console.log('filterByAmenity', filterByAmenity);
    filteredHotels = hotelCopy.filter((hotel) =>
      filterHotelsByAmenity(hotel, filterByAmenity)
    );
  } else if (filterType === 'country') {
    console.log('filterByCountry', filterByCountry);
    filteredHotels = hotelCopy.filter((hotel) =>
      filterHotelsByCountry(hotel, filterByCountry)
    );
  } else if (filterType === 'category') {
    console.log('filterByCategory', filterByCategory);
    filteredHotels = hotelCopy.filter((hotel) =>
      filterHotelsByCategory(hotel, filterByCategory)
    );
  }

  res.send({ hotels: filteredHotels });
});

app.get('/hotels', (req, res) => {
  res.send({ hotels: hotelCopy });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
