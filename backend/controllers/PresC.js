const Presence = require('../models/Presence.js');

// Create
async function createPresence(req, res) {
  try {
    const presence = await Presence.create(req.body);
    res.status(201).json(presence);
  } catch (error) {
    console.error('Error creating Presence:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function addCheckin(req, res) {
  try {
    const { id } = req.params;
    const { timecheckin } = req.body;
    const presence = await Presence.findByPk(id);
    if (!presence) {
      return res.status(404).json({ message: 'Presence not found' });
    }
    await presence.update({ checkin: timecheckin });
    res.status(200).json(presence);
  } catch (error) {
    console.error('Error updating checkin:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function addPosition(req, res) {
  try {
    const { id } = req.params;
    const { position } = req.body;
    const presence = await Presence.findByPk(id);
    if (!presence) {
      return res.status(404).json({ message: 'Presence not found' });
    }
    await presence.update({ position: position });
    res.status(200).json(presence);
  } catch (error) {
    console.error('Error updating position:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function addCheckout(req, res) {
  try {
    const { id } = req.params;
    const { timecheckout } = req.body;
    const presence = await Presence.findByPk(id);
    if (!presence) {
      return res.status(404).json({ message: 'Presence not found' });
    }
    await presence.update({ checkout: timecheckout });
    res.status(200).json(presence);
  } catch (error) {
    console.error('Error updating checkout:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Read all
async function getAllPresences(req, res) {
  try {
    const presences = await Presence.findAll();
    res.status(200).json(presences);
  } catch (error) {
    console.error('Error getting Presences:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Read one
async function getPresenceById(req, res) {
  try {
    const { id } = req.params;
    const presence = await Presence.findByPk(id);
    if (!presence) {
      return res.status(404).json({ message: 'Presence not found' });
    }
    res.status(200).json(presence);
  } catch (error) {
    console.error('Error getting Presence by id:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Update
async function updatePresence(req, res) {
  try {
    const { id } = req.params;
    const { datePr, checkin, checkout, position, status } = req.body;
    const presence = await Presence.findByPk(id);
    if (!presence) {
      return res.status(404).json({ message: 'Presence not found' });
    }
    await presence.update({ datePr, checkin, checkout, position, status });
    res.status(200).json(presence);
  } catch (error) {
    console.error('Error updating Presence:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Delete
async function deletePresence(req, res) {
  try {
    const { id } = req.params;
    const presence = await Presence.findByPk(id);
    if (!presence) {
      return res.status(404).json({ message: 'Presence not found' });
    }
    await presence.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting Presence:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  createPresence,
  getAllPresences,
  getPresenceById,
  updatePresence,
  deletePresence,
  addCheckin,
  addCheckout,
  addPosition
};
