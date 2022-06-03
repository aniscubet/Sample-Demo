# Simple Demo

## Description

A simple meteor app, where a single registered user can:
    - a) Post a message to the system - without an explicit server side call
    - b) Delete a message they own from the system, only using a server side call
    - c) See a list of the message

## To Run
You can run the app using 
    - 1. cd <folder_name>
    - 2. meteor run

## Login
    No registration form has created for create user 3 users will be created on startup. Listing users

    - Username: 'user_1', Password: '123456'
    - Username: 'user_2', Password: '123456'
    - Username: 'user_3', Password: '123456'

## To Test
    - Run command *TEST_WATCH=1 meteor test --driver-package meteortesting:mocha*
