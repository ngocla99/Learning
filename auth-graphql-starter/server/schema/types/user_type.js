const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql/type');

const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: {
        id: { type: GraphQLID },
        email: { type: GraphQLString },
    },
});

module.exports = UserType;
