const db = require("../models");

// Основная модель
const Feedback = db.feedbacks;

// Создание инстанса обратной связи
const createFeedback = async (req, res) => {
  const feedback = await Feedback.create(req.body);

  res.status(200).send(feedback);
};

module.exports = { createFeedback };
