export const JOB_TYPES = [
  {
    label: "전체",
    value: "all",
  },
  {
    label: "정규직",
    value: "full-time",
  },
  {
    label: "알바",
    value: "part-time",
  },
  {
    label: "계약직",
    value: "contract",
  },
  {
    label: "인턴",
    value: "intern",
  },
] as const;

export const LOCATION_RANGES = [
  "전체",
  "서울",
  "경기",
  "인천",
  "강원",
  "충청",
  "전라",
  "경상",
  "제주",
] as const;

export const SALARY_RANGES = [
  "전체",
  "5000만원 이상",
  "4000만원 ~ 5000만원",
  "3000만원 ~ 4000만원",
  "2000만원 ~ 3000만원",
  "1000만원 ~ 2000만원",
  "1000만원 이하",
] as const;
