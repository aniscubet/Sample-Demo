import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { MessagesCollection } from '../db/MessagesCollection';

import './Message.html';

const getUser = () => Meteor.user();

Template.messageForm.events({
  'submit .add-message-form'(e) {
    e.preventDefault();

    const target = e.target;
    const message = target.message.value;

    MessagesCollection.insert({
      userId: getUser()._id,
      message: message,
      createdAt: new Date()
    });

    target.message.value = '';
  }
})

Template.messageList.events({
  'click .delete'() {
    Meteor.call('messages.remove', this._id)
  }
});

Template.messageList.helpers({
  getUser() {
    return getUser()
  },
  isSameUser(a, b) {
      return a == b;
  },
  formatDate(date) {
    return moment(date).format('MM-DD-YYYY hh:mm:ss');
  }
})
