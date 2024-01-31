const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/votingSystem', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

const voteSchema = new mongoose.Schema({
  voterName: String,
  selectedCandidate: String,
});

const Vote = mongoose.model('Vote', voteSchema);

app.use(express.json());

app.use(express.static('public'));

// API endpoint for submitting votes
app.post('/submitVote', async (req, res) => {
  const { voterName, selectedCandidate } = req.body;

  try {
    await Vote.create({ voterName, selectedCandidate });

    res.status(200).json({ message: 'Vote submitted successfully!' });
  } catch (error) {
    console.error('Error submitting vote:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint for retrieving vote counts
app.get('/getVoteCounts', async (req, res) => {
  try {
    const candidate1Votes = await Vote.countDocuments({ selectedCandidate: 'candidate1' });
    const candidate2Votes = await Vote.countDocuments({ selectedCandidate: 'candidate2' });
    const candidate3Votes = await Vote.countDocuments({ selectedCandidate: 'candidate3' });
    const candidate4Votes = await Vote.countDocuments({ selectedCandidate: 'candidate4' });

    const totalVotes = await Vote.countDocuments();

    res.status(200).json({
      candidate1Votes,
      candidate2Votes,
      candidate3Votes,
      candidate4Votes,
      totalVotes,
    });
  } catch (error) {
    console.error('Error retrieving vote counts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server on port 3000 (replace with your desired port)
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});