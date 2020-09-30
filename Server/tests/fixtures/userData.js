import User from '../../models/User';
import Auth from '../../helpers/authToken';
import { ObjectId } from 'mongodb';

export const userOne = {
    _id: new ObjectId(),
    fullName: 'User One',
    username: 'One',
    email: 'userone@gmail.com',
    password: 'User1O@ne',
};
export const userTwo = {
    _id: new ObjectId(),
    fullName: 'User Two',
    username: 'Two',
    email: 'usertwo@gmail.com',
    password: 'User2T@wo',
};
export const userThree = {
    _id: new ObjectId(),
    fullName: 'User Three',
    username: 'Three',
    email: 'userthree@gmail.com',
    password: 'User3T@hre',
};
export const admin = {
    _id: new ObjectId(),
    fullName: 'Nishimwe Elysee',
    username: 'Nelly',
    email: 'nishimwelys@gmail.com',
    password: 'Elysee@123',
};
export const random = {
    email: 'random@gmail.com',
    password: 'Ran4D@omu',
}

export const AuthToken1 = Auth.generateUserAuthToken(userOne);
export const AuthToken2  = Auth.generateUserAuthToken(userTwo);
export const AuthToken3 = Auth.generateUserAuthToken(userThree);
export const AuthTokenAdmin = Auth.generateUserAuthToken(admin);

export const setupDummyData = async () => {
    await new User(userOne).save();
    await new User(userTwo).save();
    await new User(admin).save();
};