import Seminar from '../models/Seminar.js';

export const createSeminar = async (req, res) => {
  try {
    const payload = {
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      time: req.body.time,
      speaker: req.body.speaker,
      venue: req.body.venue,
      capacity: req.body.capacity,
      type: req.body.type,
      createdBy: req.body.createdBy,
      status: 'pending'
    };
    const seminar = await Seminar.create(payload);
    return res.status(201).json(seminar);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const listSeminars = async (req, res) => {
  try {
    const { type, status } = req.query;
    const filter = {};
    if (type) filter.type = type;
    if (status) filter.status = status;
    const seminars = await Seminar.find(filter).sort({ date: 1 });

    // If request accepts HTML, render EJS; else JSON
    if (req.headers.accept && req.headers.accept.includes('text/html')) {
      return res.render('seminars/list', { title: 'Seminars', seminars });
    }
    return res.json(seminars);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getSeminar = async (req, res) => {
  try {
    const seminar = await Seminar.findById(req.params.id);
    if (!seminar) return res.status(404).json({ message: 'Not found' });
    if (req.headers.accept && req.headers.accept.includes('text/html')) {
      return res.render('seminars/detail', { title: seminar.title, seminar });
    }
    return res.json(seminar);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const listApprovedSeminars = async (req, res) => {
  try {
    const { type } = req.query;
    const filter = { status: 'approved' };
    if (type) filter.type = type;
    const seminars = await Seminar.find(filter).sort({ date: 1 });
    return res.json(seminars);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const listPendingSeminars = async (req, res) => {
  try {
    const seminars = await Seminar.find({ status: 'pending' }).sort({ createdAt: -1 });
    if (req.headers.accept && req.headers.accept.includes('text/html')) {
      return res.render('admin/pending', { title: 'Pending Events', seminars });
    }
    return res.json(seminars);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const listSeminarsByCreator = async (req, res) => {
  try {
    const { userId } = req.params;
    const seminars = await Seminar.find({ createdBy: userId }).sort({ createdAt: -1 });
    return res.json(seminars);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const approveSeminar = async (req, res) => {
  try {
    const seminar = await Seminar.findByIdAndUpdate(
      req.params.id,
      { $set: { status: 'approved' } },
      { new: true }
    );
    if (!seminar) return res.status(404).json({ message: 'Not found' });
    return res.json(seminar);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const rejectSeminar = async (req, res) => {
  try {
    const seminar = await Seminar.findByIdAndUpdate(
      req.params.id,
      { $set: { status: 'rejected' } },
      { new: true }
    );
    if (!seminar) return res.status(404).json({ message: 'Not found' });
    return res.json(seminar);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const getSeminarStats = async (req, res) => {
  try {
    const total = await Seminar.countDocuments();
    const approved = await Seminar.countDocuments({ status: 'approved' });
    const pending = await Seminar.countDocuments({ status: 'pending' });
    const rejected = await Seminar.countDocuments({ status: 'rejected' });
    return res.json({ total, approved, pending, rejected });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateSeminar = async (req, res) => {
  try {
    const allowed = ['title','description','date','time','speaker','venue','capacity','type'];
    const update = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) update[key] = req.body[key];
    }
    const seminar = await Seminar.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!seminar) return res.status(404).json({ message: 'Not found' });
    return res.json(seminar);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const deleteSeminar = async (req, res) => {
  try {
    const deleted = await Seminar.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    return res.json({ success: true });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};


