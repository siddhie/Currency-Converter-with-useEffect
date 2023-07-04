// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [output, setOutput] = useState(0);
  const [obj, setObj] = useState({
    input: 100,
    from: "EUR",
    to: "USD"
  });


  function onChange({ target: { value, name } }) {
    setObj((e) => ({ ...e, [name]: value }));
  }

  async function fetchData() {
    try {
      let res = await fetch(
        `https://api.frankfurter.app/latest?amount=${obj.input}&from=${obj.from}&to=${obj.to}`
      );
      let finalRes = await res.json();
      setOutput(finalRes.rates[obj.to]);
    } catch (err) {
      setOutput("Please enter valid number!! input can not be empty!!");
    }
  }

  useEffect(
    function () {
      fetchData();
    },
    [obj]
  );

  return (
    <div>
      <input name="input" onChange={onChange} value={obj.input} type="text" />
      <select onChange={onChange} name="from" value={obj.from}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
        <option value="SGD">SGD</option>
      </select>
      <select onChange={onChange} name="to" value={obj.to}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{output}</p>
    </div>
  );
}
