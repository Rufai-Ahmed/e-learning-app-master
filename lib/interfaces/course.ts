export interface Course {
  id: string;
  name: string;
  description: string;
  price: string;
  instructor_id: string;
  rating: number | string;
  reviews: number | string;
  instructor: {
    fullname: string;
    image_link: string;
  };
  average_rating: string;
  category: { name: string }[];
  created_at: string;
  updated_at: string;
  image_link: string;
  isBestseller?: boolean;
  completionStatus: string;

  percentComplete: string;
}
