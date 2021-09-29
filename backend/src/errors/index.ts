class InvalidArgumentError extends Error {
  constructor(mensagem: string) {
    super(mensagem);
    this.name = "InvalidArgumentError";
  }
}

class UnauthorizedError extends Error {
  constructor(mensagem: string) {
    super(mensagem);
    this.name = "UnauthorizedError";
  }
}

class InternalError extends Error {
  constructor(mensagem: string) {
    super(mensagem);
    this.name = "InternalError";
  }
}

export { InvalidArgumentError, UnauthorizedError, InternalError };
