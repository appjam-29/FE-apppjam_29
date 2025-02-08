import * as s from "./style.css";

interface Props {
  type: "rating_score" | "mode";
  selectedValue: string;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

type TypetoValue = {
  rating_score: "별점";
  mode: "환경";
};

const typetoValue: TypetoValue = {
  rating_score: "별점",
  mode: "환경",
};

const ratingScoretoValue = {
  "1점": 1,
  "2점": 2,
  "3점": 3,
  "4점": 4,
  "5점": 5,
};

const modetoValue = {
  작업: "work",
  휴식: "rest",
  "분위기 전환": "change-ambiance",
};

export default function Dropdown({ type, selectedValue, handleChange }: Props) {
  return (
    <select
      defaultValue=""
      value={selectedValue}
      onChange={handleChange}
      name={type}
      className={s.contianer}
    >
      <option value="" disabled>
        {typetoValue[type]}
      </option>
      {Object.keys(type === "mode" ? modetoValue : ratingScoretoValue).map(
        (key) => (
          <option
            key={key}
            value={modetoValue[key as keyof typeof modetoValue]}
          >
            {key}
          </option>
        )
      )}
    </select>
  );
}
s;
