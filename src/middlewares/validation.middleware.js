function validationMiddleware(data) {

  return async (
    req,
    res,
    next
  ) => {
    const validatinOptions = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    };

    try {
      const value = await data.validateAsync(
        req.body,
        validatinOptions
      );

      req.body = value;
      next();
    } catch (error) {
      const errors = [];
      error.details.forEach((e) => {
        errors.push(e.message);
      });

      res.status(400).send({ errors: errors });
    }
  }
};

module.exports = validationMiddleware;