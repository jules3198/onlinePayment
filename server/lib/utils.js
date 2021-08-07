<<<<<<< HEAD

=======
>>>>>>> c541fac51be2cbde02fc3879833a10c7861fae41
exports.prettifyValidationErrors = (errors) =>
Object.keys(errors).reduce((acc, err) => {
  acc[err] = errors[err].message;
  return acc;
}, {});
