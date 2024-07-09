const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "User",
  tableName: "User",
  columns: {
    userId: {
      primary: true,
      type: "int",
      generated: true
    },
    firstName: {
      type: "varchar"
    },
    lastName: {
      type: "varchar"
    },
    email: {
      type: "varchar",
      unique: true
    },
    password: {
      type: "varchar"
    },
    phone: {
      type: "varchar"
    }
  },
  relations: {
    organisations: {
      type: "many-to-many",
      target: "organisation",
      joinTable: {
        name: "userOrganisations",
        joinColumns: [{ name: "userId" }],
        inverseJoinColumns: [{ name: "orgId" }]
      }
    }
  }
});
