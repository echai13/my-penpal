/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as Main } from './Main'
export { default as UserHome } from './UserHome'
export { Login, Signup } from './AuthForm'
export { default as Inbox } from './Inbox'
export { default as Preferences } from './Preferences'
export { default as Penpals } from './Penpals'
export { default as Message } from './Message'
