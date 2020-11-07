import React from "react";
import ReactDOM from "react-dom";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      step: 1,
    };
  }
  setStep = (e) => {
    console.log("count:", this.state.count);
    this.setState(
      {
        step: Number(e.target.value),
      },
      () => {
        const { count, step } = this.state;
        this.setState({ count: count + step });
      }
    );
  };
  componentDidMount() {
    const { count } = this.state;
    console.log("componentDidMount:", count);
    this.setState({ count: count + 1 });
  }
  componentDidUpdate() {
    const { count } = this.state;
    console.log("componentDidUpdate:", count);
  }
  render() {
    const { count, step } = this.state;
    console.log("render函数count值:", count);
    return (
      <>
        <h1>{count}</h1>
        <input value={step} onChange={this.setStep} />
      </>
    );
  }
}

ReactDOM.render(<Counter />, document.getElementById("root"));
