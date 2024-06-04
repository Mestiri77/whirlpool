const Presence = require('../models/Presence.js');
const PDV = require ('../models/Pdv.js')

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

    // Trouver la présence par ID
    const presence = await Presence.findByPk(id);
    if (!presence) {
      return res.status(404).json({ message: 'Presence not found' });
    }

    // Vérifier si la date fournie est la même que celle qui existe déjà
    const existingDatePr = presence.datePr.toISOString().split('T')[0]; // Convertir la date en format ISO
    const newDatePr = new Date(datePr).toISOString().split('T')[0]; // Convertir la nouvelle date en format ISO

    if (existingDatePr !== newDatePr) {
      return res.status(400).json({ message: 'Dates do not match' });
    }

    // Mettre à jour la présence
    await presence.update({ checkin, checkout, position, status });

    // Renvoyer la réponse mise à jour
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
async function getPresencesByPDVName(req, res) {
  const pdvName = req.params;

  try {
    // Rechercher le point de vente par nom
    const pdv = await PDV.findOne({
      where: { name: pdvName },  // Ajustez le nom du champ selon votre schéma
      include: [{
        model: Presence,
        as: 'Presences'  // Assurez-vous que l'alias correspond à votre configuration d'association
      }]
    });

    if (!pdv) {
      return res.status(404).json({ message: `Aucun point de vente trouvé avec le nom ${pdvName}` });
    }

    // Afficher les informations des présences
    const presences = pdv.Presences;
    if (presences && presences.length > 0) {
      return res.status(200).json(presences);
    } else {
      return res.status(404).json({ message: `Aucune présence trouvée pour le point de vente ${pdvName}` });
    }
  } catch (error) {
    console.error(`Erreur lors de la récupération des présences pour ${pdvName}:`, error);
    return res.status(500).json({ message: 'Erreur interne du serveur' });
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
  addPosition, 
  getPresencesByPDVName
};
