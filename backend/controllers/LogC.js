const Log = require('../models/Log.js');

// Create
async function createLog(req, res) {
  try {
    const { messageAc, dateAc, TimeAc } = req.body;
    const log = await Log.create({ messageAc, dateAc, TimeAc });
    res.status(201).json(log);
  } catch (error) {
    console.error('Error creating log:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Read all
async function getAllLogs(req, res) {
  try {
    const logs = await Log.findAll();
    res.status(200).json(logs);
  } catch (error) {
    console.error('Error getting logs:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Read one
async function getLogById(req, res) {
  try {
    const { id } = req.params;
    const log = await Log.findByPk(id);
    if (!log) {
      return res.status(404).json({ message: 'Log not found' });
    }
    res.status(200).json(log);
  } catch (error) {
    console.error('Error getting log by id:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Update
async function updateLog(req, res) {
  try {
    const { id } = req.params;
    const { messageAc, dateAc, TimeAc } = req.body;
    const log = await Log.findByPk(id);
    if (!log) {
      return res.status(404).json({ message: 'Log not found' });
    }
    await log.update({ messageAc, dateAc, TimeAc });
    res.status(200).json(log);
  } catch (error) {
    console.error('Error updating log:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Delete
async function deleteLog(req, res) {
  try {
    const { id } = req.params;
    const log = await Log.findByPk(id);
    if (!log) {
      return res.status(404).json({ message: 'Log not found' });
    }
    await log.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting log:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  createLog,
  getAllLogs,
  getLogById,
  updateLog,
  deleteLog
};
