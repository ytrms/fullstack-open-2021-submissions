import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  let initialVotes = new Array(anecdotes.length).fill(0);

  const [votes, setVotes] = useState(initialVotes);
  const [selected, setSelected] = useState(Math.floor(Math.random() * anecdotes.length))
  const [highestVotedIndex, setHighestVoted] = useState();

  const pickRandomAnecdote = () => {
    let randIndex = Math.floor(Math.random() * anecdotes.length);

    while (randIndex === selected) {
      randIndex = Math.floor(Math.random() * anecdotes.length);
    }

    setSelected(randIndex);
  }

  const increaseVote = () => {
    let increasedVotes = [...votes];
    increasedVotes[selected]++;
    setVotes(increasedVotes);
    setHighestVoted(increasedVotes.indexOf(Math.max(...increasedVotes)));
  }


  return (
    <div>
      {anecdotes[selected]}<br />
      has {votes[selected]} votes.<br />
      <button onClick={increaseVote}>Vote</button>
      <button onClick={pickRandomAnecdote}>Next anecdote</button>
      <h1>Highest voted anecdote</h1>
      {anecdotes[highestVotedIndex]}
    </div>
  )
}

export default App