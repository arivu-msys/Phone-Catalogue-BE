import bcrypt from 'bcrypt';

// WARNING: This is an in-memory user list for development/demo only.
// Passwords are hashed using bcrypt. In production use a database.

// Helper to create a hash synchronously for initial users
function hashSync(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

export const users = [
  {
    id: 1,
    username: 'arivu',
    // password: 'arivu123'
    passwordHash: hashSync('arivu123'),
  },
  {
    id: 2,
    username: 'selva',
    // password: 'secret456'
    passwordHash: hashSync('arivu123'),
  },
  {
    id: 3,
    username: 'vishnu',
    // password: 'vishnu123'
    passwordHash: hashSync('vishnu123'),
  },
  {
    id: 4,
    username: 'sudha',
    // password: 'sudha123'
    passwordHash: hashSync('sudha123'),
  },
];
