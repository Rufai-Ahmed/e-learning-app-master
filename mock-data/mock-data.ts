import { Book, Code, Palette, Music, Film, ChartBar } from "lucide-react-native"

export const categories = [
  { id: 1, title: "Arts", icon: Palette, color: "#FF6B6B" },
  { id: 2, title: "Business", icon: ChartBar, color: "#4ECDC4" },
  { id: 3, title: "Programming", icon: Code, color: "#45B7D1" },
  { id: 4, title: "Music", icon: Music, color: "#F7B731" },
  { id: 5, title: "Film & Video", icon: Film, color: "#5D5FEF" },
  { id: 6, title: "Humanities", icon: Book, color: "#FF8066" },
]

export const recommendedCourses = [
  {
    id: 1,
    title: "Modern React with Redux [2024 Update]",
    author: "Stephen Grider",
    price: "69,900.00",
    rating: 4.7,
    reviews: 87923,
    image: "https://img-c.udemycdn.com/course/240x135/705264_caa9_11.jpg",
    isBestseller: true,
  },
  {
    id: 2,
    title: "The Complete 2024 Web Development Bootcamp",
    author: "Dr. Angela Yu",
    price: "74,900.00",
    rating: 4.8,
    reviews: 240345,
    image: "https://img-c.udemycdn.com/course/240x135/1565838_e54e_16.jpg",
    isBestseller: true,
  },
  {
    id: 3,
    title: "Machine Learning A-Z™: AI, Python & R + ChatGPT",
    author: "Kirill Eremenko, Hadelin de Ponteves",
    price: "84,900.00",
    rating: 4.5,
    reviews: 170234,
    image: "https://img-c.udemycdn.com/course/240x135/950390_270f_3.jpg",
    isBestseller: false,
  },
]

export const popularCourses = [
  {
    id: 1,
    title: "The Science of Well-Being",
    author: "Yale University",
    price: "Free",
    rating: 4.9,
    reviews: 38000,
    image:
      "https://img-c.udemycdn.com/course/240x135/1565838_e54e_16.jpg",
    isBestseller: true,
  },
  {
    id: 2,
    title: "Learning How to Learn",
    author: "Deep Teaching Solutions",
    price: "Free",
    rating: 4.8,
    reviews: 42000,
    image:
      "https://img-c.udemycdn.com/course/240x135/1565838_e54e_16.jpg",
    isBestseller: false,
  },
  {
    id: 3,
    title: "Financial Markets",
    author: "Yale University",
    price: "Free",
    rating: 4.7,
    reviews: 36000,
    image:
      "https://img-c.udemycdn.com/course/240x135/705264_caa9_11.jpg",
    isBestseller: true,
  },
]


export const searchResults = [
  {
    id: 1,
    title: "Complete Python Bootcamp: From Zero to Hero",
    author: "Jose Portilla",
    price: "74,900.00",
    rating: 4.6,
    reviews: 384766,
    image: "https://img-c.udemycdn.com/course/240x135/567828_67d0.jpg",
    isBestseller: true,
  },
  {
    id: 2,
    title: "100 Days of Code: The Complete Python Pro Bootcamp",
    author: "Dr. Angela Yu",
    price: "84,900.00",
    rating: 4.7,
    reviews: 154392,
    image: "https://img-c.udemycdn.com/course/240x135/2776760_f176_10.jpg",
    isBestseller: true,
  },
  {
    id: 3,
    title: "Python for Data Science and Machine Learning Bootcamp",
    author: "Jose Portilla",
    price: "79,900.00",
    rating: 4.6,
    reviews: 105654,
    image: "https://img-c.udemycdn.com/course/240x135/903744_8eb2.jpg",
    isBestseller: false,
  },
  {
    id: 4,
    title: "Learn Python Programming Masterclass",
    author: "Tim Buchalka",
    price: "69,900.00",
    rating: 4.5,
    reviews: 82547,
    image: "https://img-c.udemycdn.com/course/240x135/629302_8a2d_2.jpg",
    isBestseller: true,
  },
  {
    id: 5,
    title: "Python and Django Full Stack Web Developer Bootcamp",
    author: "Jose Portilla",
    price: "74,900.00",
    rating: 4.4,
    reviews: 46729,
    image: "https://img-c.udemycdn.com/course/240x135/822444_a6db.jpg",
    isBestseller: false,
  },
]
