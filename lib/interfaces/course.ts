export interface Category {
  name: string;
}

export interface Instructor {
  fullname: string;
  image_link: string;
}

export interface Student {
  id: string;
  fullname: string;
  verified: boolean;
  categories: Category[];
  image_link: string;
}

export interface Option {
  value: string;
  id: string;
  answer?: boolean;
}

export interface Question {
  question: string;
  quiz_id: string;
  id: string;
  options: Option[];
}

export interface Quiz {
  module_id: string;
  questions: Question[];
  id: string;
}

export interface Lesson {
  title: string;
  description: string;
  duration: string;
  module_id: string;
  video_link: string;
  id: string;
}

export interface Module {
  title: string;
  description: string;
  course_id: string;
  id: string;
  completed: boolean;
  lessons: Lesson[];
  quiz: Quiz[] | null;
}

export interface Course {
  name: string;
  description: string;
  price: string;
  id: string;
  instructor_id: string;
  instructor: Instructor;
  average_rating: string | null;
  category: Category[];
  created_at: string;
  updated_at: string;
  image_link: string;
  students: Student[] | null;
  discount: string;
  modules: Module[];
  enrolled: boolean | null;
  rating: number | string;
  reviews: number | string;
  isBestseller?: boolean;
  completionStatus: string;
  percentComplete: string;
}
