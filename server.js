const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql');

//using mock data for demo purpose
const data = require('./mockData');
const app = express();
const { classes, teachers } = data;

const TeacherType = new GraphQLObjectType({
    name: 'Teacher',
    description: 'This is a teacher for a given class or subject',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        classes:{
            type: new GraphQLList(ClassType),
            resolve: (teach) => {
                return classes.filter(c => c.teacherId === teach.id)
            }
        }
    })
});

const ClassType = new GraphQLObjectType({
    name: 'Class',
    description: 'This is a class teaching one subject',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        teacherId: { type: new GraphQLNonNull(GraphQLInt) },
        teacher: { 
            type: TeacherType,
            resolve: (cls) => {
                return teachers.find(teach => teach.id === cls.teacherId)
            }
        }
    })
});

const query = new GraphQLObjectType({
    name: 'query',
    description: 'root',
    fields: () => ({
        class:{
            type: ClassType,
            description: 'A single class',
            args:{
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => {
                return classes.find(cls => cls.id == args.id)
            }
        },
        classes:{
            type: GraphQLList(ClassType),
            description: 'List of classes',
            resolve: () => {
                //here you would query database or make service call
                return classes;
            }
        },
        teacher:{
            type: TeacherType,
            description: 'A single teachers',
            args:{
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => {
                return teachers.find(teach => teach.id == args.id)
            }
        },
        teachers:{
            type: GraphQLList(TeacherType),
            description: 'List of teachers',
            resolve: () => {
                //here you would query database or make service call
                return teachers;
            }
        }
    })
})

const schema = new GraphQLSchema({
    query
});

//setup route to use graphQL
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

//launch app on chosen port
app.listen(5000, () => {
    console.log('server running...');
});