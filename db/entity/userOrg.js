const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "UserOrganisation",
  tableName: "userOrganisations",
  columns: {
    userId: {
      primary: true,
      type: "int"
    },
    orgId: {
      primary: true,
      type: "int"
    }
  },
  relations: {
    User: {
      type: "many-to-one",
      target: "User",
      joinColumn: { name: "userId" }
    },
    organisation: {
      type: "many-to-one",
      target: "organisation",
      joinColumn: { name: "orgId" }
    }
  }
});
