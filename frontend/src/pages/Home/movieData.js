const movies = [
  {
    id: 1,
    title: "Movie 1",
    genre: "Action, Adventure",
    director: "Director 1",
    actors: "Actor 1, Actor 2",
    poster: require("./Picture/1.jpg"),
    showtimes: [
      {
        date: "2024-12-10",
        time: "10:00 AM",
        branch: "CGV Vincom",
        theater: "Theater 1",
      },
      {
        date: "2024-12-10",
        time: "01:00 PM",
        branch: "CGV Landmark",
        theater: "Theater 2",
      },
      {
        date: "2024-12-11",
        time: "04:00 PM",
        branch: "CGV Bitexco",
        theater: "Theater 3",
      },
    ],
  },
  {
    id: 2,
    title: "Movie 2",
    genre: "Comedy, Drama",
    director: "Director 2",
    actors: "Actor 3, Actor 4",
    poster: require("./Picture/2.jpg"),
    showtimes: [
      {
        date: "2024-12-10",
        time: "09:30 AM",
        branch: "CGV Bitexco",
        theater: "Theater 1",
      },
      {
        date: "2024-12-11",
        time: "12:30 PM",
        branch: "CGV Vincom",
        theater: "Theater 2",
      },
      {
        date: "2024-12-12",
        time: "03:00 PM",
        branch: "CGV Landmark",
        theater: "Theater 3",
      },
    ],
  },
  {
    id: 3,
    title: "Movie 3",
    genre: "Horror, Mystery",
    director: "Director 3",
    actors: "Actor 5, Actor 6",
    poster: require("./Picture/3.jpg"),
    showtimes: [
      {
        date: "2024-12-12",
        time: "03:00 PM",
        branch: "CGV Vincom",
        theater: "Theater 1",
      },
      {
        date: "2024-12-12",
        time: "06:00 PM",
        branch: "CGV Landmark",
        theater: "Theater 2",
      },
      {
        date: "2024-12-13",
        time: "07:00 PM",
        branch: "CGV Bitexco",
        theater: "Theater 3",
      },
    ],
  },
  {
    id: 4,
    title: "Movie 4",
    genre: "Romance, Drama",
    director: "Director 4",
    actors: "Actor 7, Actor 8",
    poster: require("./Picture/4.jpg"),
    showtimes: [
      {
        date: "2024-12-11",
        time: "02:00 PM",
        branch: "CGV Vincom",
        theater: "Theater 1",
      },
      {
        date: "2024-12-11",
        time: "05:00 PM",
        branch: "CGV Landmark",
        theater: "Theater 2",
      },
      {
        date: "2024-12-12",
        time: "09:00 PM",
        branch: "CGV Bitexco",
        theater: "Theater 3",
      },
    ],
  },
  {
    id: 5,
    title: "Movie 5",
    genre: "Sci-Fi, Action",
    director: "Director 5",
    actors: "Actor 9, Actor 10",
    poster: require("./Picture/5.jpeg"),
    showtimes: [
      {
        date: "2024-12-10",
        time: "08:00 AM",
        branch: "CGV Vincom",
        theater: "Theater 1",
      },
      {
        date: "2024-12-10",
        time: "12:00 PM",
        branch: "CGV Landmark",
        theater: "Theater 2",
      },
      {
        date: "2024-12-11",
        time: "06:00 PM",
        branch: "CGV Bitexco",
        theater: "Theater 3",
      },
    ],
  },
];
export default movies;
