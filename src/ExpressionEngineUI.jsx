// ExpressionEngineUI.js
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ExpressionEngineUI = () => {
  const [rules, setRules] = useState([
    {
      key: "age",
      output: {
        value: 60,
        operator: ">=",
        score: 50,
      },
    },
  ]);

  const [combinator, setCombinator] = useState("and");
  const [submittedData, setSubmittedData] = useState(null);

  const handleAddRule = () => {
    setRules([
      ...rules,
      { key: "age", output: { value: 40, operator: ">=", score: 100 } },
    ]);
  };

  const handleDeleteRule = (index) => {
    const newRules = [...rules];
    newRules.splice(index, 1);
    setRules(newRules);
  };

  const handleSubmit = () => {
    // Do something with the rules and combinator
    const data = { rules, combinator };
    setSubmittedData(data);
    console.log(data);
  };

  return (
    <div
      className="container-fluid px-5 py-4   display-flex  justify-content-center justify-content-between "
      style={{ height: "100vh", width: "100vw", overflow: "scroll" }}
    >
    
      <div
        className="align-items-center p-2"
        style={{height: "4rem", width: "50vw"}}
      >
        <button
          type="button"
          className="btn btn-primary me-5"
          onClick={handleAddRule}
        >
          Add Expression
        </button>

   
        <button
          type="button"
          className="btn btn-success"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>


      <div className="row  dispaly-flex justify-content-center justify-content-between">
        <form
          className="col-md-7  col-lg-7 mb-5 p-4 box-shadow1"
          style={{ height: "80vh", overflowY: "scroll" }}
        >
          <div className="mb-3">
            <label htmlFor="combinator">Connector Type: </label>
            <select
              id="combinator"
              className="form-select"
              value={combinator}
              onChange={(e) => setCombinator(e.target.value)}
            >
              <option value="and">AND</option>
              <option value="or">OR</option>
            </select>
          </div>

          {rules.map((rule, index) => (
            <div key={index} className="mb-3">
              <label>Expression {index + 1}</label>
              <div className="row">
                <div className="col-md-3">
                  <label htmlFor={`ruleType${index}`}>Rule Type:</label>
                  <select
                    id={`ruleType${index}`}
                    className="form-select"
                    value={rule.key}
                    onChange={(e) => {
                      const newRules = [...rules];
                      newRules[index].key = e.target.value;
                      setRules(newRules);
                    }}
                  >
                    <option value="age">Age</option>
                    <option value="account_balance">Account Balance</option>
                    <option value="credit_score">Credit Score</option>
                  </select>
                </div>

                <div className="col-md-3">
                  <label htmlFor={`operator${index}`}>Operator:</label>
                  <select
                    id={`operator${index}`}
                    className="form-select"
                    value={rule.output.operator}
                    onChange={(e) => {
                      const newRules = [...rules];
                      newRules[index].output.operator = e.target.value;
                      setRules(newRules);
                    }}
                  >
                    <option value=">">{">"}</option>
                    <option value="<">{"<"}</option>
                    <option value=">=">{">="}</option>
                    <option value="<=">{"<="}</option>
                    <option value="=">{"="}</option>
                  </select>
                </div>

                <div className="col-md-2 ">
                  <label htmlFor={`value${index}`}>Value:</label>
                  <input
                    type="number"
                    id={`value${index}`}
                    className="form-control"
                    value={rule.output.value}
                    onChange={(e) => {
                      const newRules = [...rules];
                      newRules[index].output.value = parseInt(
                        e.target.value,
                        10
                      );
                      setRules(newRules);
                    }}
                    required
                  />
                </div>

                <div className="col-md-2">
                  <label htmlFor={`score${index}`}>Score:</label>
                  <input
                    type="number"
                    id={`score${index}`}
                    className="form-control"
                    value={rule.output.score}
                    onChange={(e) => {
                      const newRules = [...rules];
                      newRules[index].output.score = parseInt(
                        e.target.value,
                        10
                      );
                      setRules(newRules);
                    }}
                    required
                  />
                </div>

                <div className="col-md-1 mt-4">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDeleteRule(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </form>

        {/* Display Result */}
        {submittedData && (
          <div
            className="col-md-5 col-lg-4  box-shadow1 px-4"
            style={{ height: "80vh", overflowY: "scroll" }}
          >
            <h2>Output:</h2>
            <pre>{JSON.stringify(submittedData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpressionEngineUI;
