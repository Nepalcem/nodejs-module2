const tryCatchHandler = (controller) => async (req, res) => {
  try {
    await controller(req, res);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = tryCatchHandler;