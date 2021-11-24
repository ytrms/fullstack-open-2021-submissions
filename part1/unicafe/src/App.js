import React, { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {

  let avg = (good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad)
  let percentPositive = (good / (good + neutral + bad)) * 100

  if (good + neutral + bad === 0) {
    return (
      <div>
        No feedback given.
      </div>
    )
  }

  return (
    <div>
      <div>
        good {good}<br />
        neutral {neutral}<br />
        bad {bad}<br />
        all {good + neutral + bad}<br />
        average {avg}<br />
        positive {percentPositive}%<br />
      </div>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="Good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button onClick={() => setBad(bad + 1)} text="Bad" />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

export default App