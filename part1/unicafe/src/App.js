import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({good, neutral, bad}) => {

  const all = good + neutral + bad
  const percentage = ((good / all ) * 100).toString() + " %"

  if (good === 0 && bad === 0 && neutral === 0) {
    return(
      <p>No feedback given</p>
    )
  }

  return(
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="All" value={all} />
          <StatisticLine text="Average" value={(good - bad ) / all} />
          <StatisticLine text="Positive" value={percentage} />
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <th>{text}:</th>
      <th>{value}</th>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handGoodClick = () => setGood(good + 1)
  const handNeutralClick = () => setNeutral(neutral + 1)
  const handBadClick = () => setBad(bad + 1)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handGoodClick} text={"good"} />
      <Button handleClick={handNeutralClick} text={"neutral"} />
      <Button handleClick={handBadClick} text={"bad"} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App