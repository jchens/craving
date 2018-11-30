
const profilesList = [
  {
    image: require('../Images/FTProfiles/los_tolucas.jpg'),
    name: "Los Tolucas",
    cuisine:"Mexican",
    description: "Authentic Mexican street food",
    time: "11:00am - 2:00pm",
    address: "S Service Rd, Stanford, CA 94305",
    fave: true,
    reminder: true,
    visit: "TODAY"
  },

  {
    image: require('../Images/FTProfiles/twister.png'),
    name: "Twister",
    cuisine:"Chinese",
    description: "Based in the Bay Area and serving over 100 different places with our delicious Chinese style cuisine",
    time: "11:00am - 2:00pm",
    address: "401 Via Ortega, Stanford, CA 94305",
    fave: false,
    reminder: false,
    visit: "YESTERDAY"
  },
  {
    image: require('../Images/FTProfiles/i_love_cheesesteak.jpg'),
    name: "I Love Cheesesteak",
    cuisine:"Cheesesteaks",
    description: "Fresh Cheesesteaks with an Asian Twist",
    time: "1:30pm - 3:30pm",
    address: "Stanford Stadium, 601 Nelson Rd, Stanford, CA 94305",
    fave: true,
    reminder: false,
    visit: "3 DAYS AGO"
  },
  {
    image: require('../Images/FTProfiles/the_waffle_roost.png'),
    name: "The Waffle Roost",
    cuisine:"Southern",
    description: "Chicken and waffles is what we do!",
    time: "11:00am - 1:00pm",
    address: "3251 Hillview Ave, Palo Alto, CA 94304",
    fave: false,
    reminder: true,
    visit: "4 DAYS AGO"
  },
  {
    image: require('../Images/FTProfiles/oaxacan_kitchen_mobile.jpg'),
    name: "Oaxacan Kitchen Mobile",
    cuisine:"Mexican",
    description: "Auténtica Comida Mexicana - Oaxacan Street Food at its best",
    time: "10:30am - 1:30pm",
    address: "Nordstrom, 550 Stanford Shopping Center, Palo Alto, CA 94304",
    fave: true,
    reminder: true,
    visit: "2 WEEKS AGO"
  },
  {
    image: require('../Images/FTProfiles/akita_gourmet.png'),
    name: "Akita Gourmet",
    cuisine:"Sushi",
    description: "We completely satisfy all sushi lovers' hearts with our quality",
    time: "11:30am - 1:30pm",
    address: "600 W California Ave, Sunnyvale, CA 94086",
    fave: false,
    reminder: true,
    visit: "2 WEEKS AGO"
  },
  {
    image: require('../Images/FTProfiles/trijeet.jpeg'),
    name: "3jeet Food Truck",
    cuisine:"UI/UX",
    description: "Serving custom, hand-crafted user experiences, with a side of 'what-are-rubrics?'",
    time: "12:30pm - 2:20pm",
    address: "260-002, Pigott Hall, Stanford, CA 94305",
    fave: true,
    reminder: true,
    visit: "1 MONTH AGO"
  },
]

const profiles = {
  los_tolucas: profilesList[0],
  capelos_barbecue: profilesList[1],
  twister: profilesList[2],
  i_love_cheesesteak: profilesList[3],
  the_waffle_roost: profilesList[4],
  oaxacan_kitchen_mobile: profilesList[5],
  akita_gourmet: profilesList[6],
  sanjeet_food_truck: profilesList[7],

  random: () => {
    return profilesList[Math.floor(Math.random() * 8)]
  }

}

export default profiles
export {profilesList};
