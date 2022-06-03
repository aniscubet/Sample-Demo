import { check } from 'meteor/check';
import { MessagesCollection } from '../db/MessagesCollection';

Meteor.methods({
  'messages.remove'(messageId) {
    check(messageId, String);

    if (!this.userId) {
      throw new Meteor.Error('Not Authorized');
    }

    const message = MessagesCollection.findOne({
      _id: messageId,
      userId: this.userId
    });

    if (!message) {
      throw new Meteor.Error('Access Denied');
    }

    MessagesCollection.remove(messageId);
  }
});
