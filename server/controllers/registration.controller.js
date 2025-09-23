import Registration from '../models/Registration.js';
import Seminar from '../models/Seminar.js';

export const registerForSeminar = async (req, res) => {
  try {
    const { userId, seminarId } = req.body;
    const seminar = await Seminar.findById(seminarId);
    if (!seminar) return res.status(404).json({ message: 'Seminar not found' });

    const registration = await Registration.create({ userId, seminarId });
    return res.status(201).json(registration);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const listUserRegistrations = async (req, res) => {
  try {
    const { userId } = req.params;
    const registrations = await Registration.find({ userId })
      .populate('seminarId')
      .sort({ createdAt: -1 });

    if (req.headers.accept && req.headers.accept.includes('text/html')) {
      return res.render('registrations/list', { title: 'My Seminars', registrations });
    }
    return res.json(registrations);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


