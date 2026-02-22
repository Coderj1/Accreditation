import { Client, Account, Databases, Avatars } from 'appwrite'

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1')   // <-- REQUIRED
  .setProject('6998c1aa003d6bd52636');           // <-- Your project ID

export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);