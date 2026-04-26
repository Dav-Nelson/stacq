const db = require('../db');

exports.createQueue = async (req, res) => {
  const { name, slug } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO queues (business_id, name, slug) VALUES ($1, $2, $3) RETURNING *',
      [req.business.id, name, slug]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ message: 'Error creating queue', error: err.message });
  }
};

exports.joinQueue = async (req, res) => {
  const { queueId } = req.params;
  const { name } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO queue_entries (queue_id, name) VALUES ($1, $2) RETURNING *',
      [queueId, name]
    );
    
    // Notify connected clients via socket
    req.app.get('io').to(queueId).emit('update-queue', result.rows[0]);
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ message: 'Error joining queue', error: err.message });
  }
};

exports.getQueue = async (req, res) => {
  const { queueId } = req.params;
  try {
    const result = await db.query(
      'SELECT * FROM queue_entries WHERE queue_id = $1 AND status = \'waiting\' ORDER BY joined_at ASC',
      [queueId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching queue', error: err.message });
  }
};

exports.updateEntryStatus = async (req, res) => {
  const { entryId } = req.params;
  const { status } = req.body;
  try {
    const result = await db.query(
      'UPDATE queue_entries SET status = $1 WHERE id = $2 RETURNING *',
      [status, entryId]
    );
    
    // Notify via socket
    const queueId = result.rows[0].queue_id;
    req.app.get('io').to(queueId).emit('update-queue', result.rows[0]);
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ message: 'Error updating status', error: err.message });
  }
};
