module.exports = function autoCatch(handlers) {
  return Object.keys(handlers).reduce((wrapped, key) => {
    const handler = handlers[key];
    wrapped[key] = (req, res, next) =>
      Promise.resolve(handler(req, res, next)).catch(next);
    return wrapped;
  }, {});
};

