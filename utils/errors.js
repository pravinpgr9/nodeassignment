module.exports = {
  BadRequestError: class extends Error {
    constructor(message = 'Bad Request') {
      super(message);
      this.name = 'BadRequestError';
      this.status = 400;
    }
  },

  UnauthorizedError: class extends Error {
    constructor(message = 'Unauthorized') {
      super(message);
      this.name = 'UnauthorizedError';
      this.status = 401;
    }
  },

  ForbiddenError: class extends Error {
    constructor(message = 'Forbidden') {
      super(message);
      this.name = 'ForbiddenError';
      this.status = 403;
    }
  },

  NotFoundError: class extends Error {
    constructor(message = 'Not Found') {
      super(message);
      this.name = 'NotFoundError';
      this.status = 404;
    }
  },

  ConflictError: class extends Error {
    constructor(message = 'Conflict') {
      super(message);
      this.name = 'ConflictError';
      this.status = 409;
    }
  },

  InternalServerError: class extends Error {
    constructor(message = 'Internal Server Error') {
      super(message);
      this.name = 'InternalServerError';
      this.status = 500;
    }
  }
}; 

