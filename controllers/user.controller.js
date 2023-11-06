// Получение юзера
const getUser = async (req, res) => {
  res
    .status(200)
    .send(
      req.user
        ? { id: req.user.id, email: req.user.email, isFound: true }
        : { isFound: false }
    );
};

module.exports = { getUser };
