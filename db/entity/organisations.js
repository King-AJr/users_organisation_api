const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Organisation",
  tableName: "organisation",
  columns: {
    orgId: {
      primary: true,
      type: "int",
      generated: true
    },
    name: {
      type: "varchar"
    },
    description: {
      type: "varchar"
    }
  },
  relations: {
    users: {
      type: "many-to-many",
      target: "User",
      joinTable: {
        name: "userOrganisations",
        joinColumns: [{ name: "orgId" }],
        inverseJoinColumns: [{ name: "userId" }]
      }
    }
  }
});
