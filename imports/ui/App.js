import { Template } from 'meteor/templating';
import { MessagesCollection } from '../db/MessagesCollection';
import { ReactiveDict } from 'meteor/reactive-dict';

import './App.html';
import './Login.js';
import './Message.js';

const IS_LOADING_STRING = 'isLoading';
const getUser = () => Meteor.user();
const isUSerLogged = () => !!getUser();

Template.mainContainer.onCreated(function mainContainerOnCreated() {
  this.state = new ReactiveDict();

  const handler = Meteor.subscribe('messages');
  Tracker.autorun(() => {
    this.state.set(IS_LOADING_STRING, !handler.ready());
  });
});

Template.mainContainer.helpers({
  isUSerLogged() {
    return isUSerLogged();
  },
  messages() {
    return MessagesCollection.find({}, { sort: { createdAt: -1 } });
  },
  getUser() {
    return getUser();
  },
  isLoading() {
    const instance = Template.instance();
    return instance.state.get(IS_LOADING_STRING);
  }
});

Template.mainContainer.events({
  'click .logoutButton'(e) {
    e.preventDefault();
    Meteor.logout();
  }
})
