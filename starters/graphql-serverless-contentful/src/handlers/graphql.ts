import { ApolloServer } from '@apollo/server';
import { startServerAndCreateLambdaHandler } from '@as-integrations/aws-lambda';
import { typeDefs, resolvers } from '../schema';
import axios from 'axios';

// Set Axios defaults
axios.defaults.baseURL = `https://api.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT}/entries`;
axios.defaults.headers.common[
  'Authorization'
] = `Bearer ${process.env.CONTENTFUL_CONTENT_MANAGEMENT_API_TOKEN}`;

export const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const server = startServerAndCreateLambdaHandler(apolloServer as any);

