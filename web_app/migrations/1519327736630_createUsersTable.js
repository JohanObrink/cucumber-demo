exports.up = (pgm) => {
  pgm.createTable('users', {
    id: {type: 'bigserial', primaryKey: true},
    username: {type: 'text', notNull: true, unique: true},
    password: {type: 'text', notNull: true},
    firstName: {type: 'text', notNull: true},
    lastName: {type: 'text', notNull: true}
  })
}

exports.down = (pgm) => {
  pgm.dropTable('users')
}
