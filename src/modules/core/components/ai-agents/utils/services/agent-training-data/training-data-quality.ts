import {
  CheckCircle,
  TrendingUp,
  Brain,
  BookOpen,
  AlertTriangle,
} from "lucide-react";

const getTrainingDataQualityColor = (quality: string) => {
  switch (quality) {
    case "excellent":
      return "text-green-600 bg-green-50 border-green-200";
    case "good":
      return "text-blue-600 bg-blue-50 border-blue-200";
    case "basic":
      return "text-amber-600 bg-amber-50 border-amber-200";
    case "insufficient":
      return "text-red-600 bg-red-50 border-red-200";
    default:
      return "text-gray-600 bg-gray-50 border-gray-200";
  }
};

const getTrainingDataQualityIcon = (quality: string) => {
  switch (quality) {
    case "excellent":
      return CheckCircle;
    case "good":
      return TrendingUp;
    case "basic":
      return Brain;
    case "insufficient":
      return AlertTriangle;
    default:
      return BookOpen;
  }
};

export { getTrainingDataQualityColor, getTrainingDataQualityIcon };
