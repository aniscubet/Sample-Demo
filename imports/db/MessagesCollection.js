import { Mongo } from 'meteor/mongo';

export const MessagesCollection = new Mongo.Collection('messages');

MessagesCollection.allow({
  insert(userId, doc) {
    return userId && doc.userId === userId;
  },
})
