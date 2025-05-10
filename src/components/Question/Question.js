import React from "react";
import PropTypes from "prop-types";
import "./Question.scss";
import translate from "../../i18n/translate";

const Question = (props) => {
  const {
    id,
    question,
    first,
    second,
    third,
    fourth,
    value,
    onChange,
    firstValue,
    secondValue,
    thirdValue,
    fourthValue,
  } = props;

  return (
    <div className="ms-4">
      <div className="feedback-title my-3">{question}</div>
      <div value={value} onChange={onChange} className="ms-3">
        <div
          className="d-flex align-items-center radio-item"
          // value={value}
          // onChange={onChange}
        >
          <input
            id={`${id}first`}
            // name={question}
            value={firstValue}
            type="radio"
            checked={value === firstValue}
            className="cursor-pointer ms-1"
          />
          <label
            htmlFor={`${id}first`}
            className="feedback-item ms-2 cursor-pointer"
          >
            {first}
          </label>
        </div>
        <div
          className="d-flex align-items-center radio-item"
          // value={value}
          // onChange={onChange}
        >
          <input
            id={`${id}second`}
            // name={question}
            value={secondValue}
            type="radio"
            checked={value === secondValue}
            className="cursor-pointer ms-1"
          />
          <label
            htmlFor={`${id}second`}
            className="feedback-item ms-2 cursor-pointer"
          >
            {second}
          </label>
        </div>
        <div
          className="d-flex align-items-center radio-item"
          // value={value}
          // onChange={onChange}
        >
          <input
            id={`${id}third`}
            // name={question}
            value={thirdValue}
            type="radio"
            checked={value === thirdValue}
            className="cursor-pointer ms-1"
          />
          <label
            htmlFor={`${id}third`}
            className="feedback-item ms-2 cursor-pointer"
          >
            {third}
          </label>
        </div>
        <div
          className="d-flex align-items-center radio-item"
          // value={value}
          // onChange={onChange}
        >
          <input
            id={`${id}fourth`}
            // name={question}
            value={fourthValue}
            type="radio"
            checked={value === fourthValue}
            className="cursor-pointer ms-1"
          />
          <label
            htmlFor={`${id}fourth`}
            className="feedback-item ms-2 cursor-pointer"
          >
            {fourth}
          </label>
        </div>
      </div>
    </div>
  );
};

Question.propTypes = {
  id: PropTypes.string,
  question: PropTypes.string,
  first: PropTypes.string,
  second: PropTypes.string,
  third: PropTypes.string,
  fourth: PropTypes.string,
  onChange: PropTypes.func,
};

Question.defaultProps = {
  first: translate("Excellent"),
  second: translate("Good"),
  third: translate("Medium"),
  fourth: translate("Weak"),
  firstValue: "perfect",
  secondValue: "good",
  thirdValue: "normal",
  fourthValue: "bad",
};

export default Question;
