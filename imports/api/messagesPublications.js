import { Meteor } from 'meteor/meteor';
import { MessagesCollection } from '/imports/db/MessagesCollection';

Meteor.publish('messages', function publishMessages() {
  if (this.userId) {
    return MessagesCollection.find({});
  } else {
    return [];
  }
});
