/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const { User, Message, Preference, Interest, Penpal, Delivery } = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const interests = await Promise.all([
    Interest.create({ category: 'Arts & Culture' }),
    Interest.create({ category: 'Anthropology' }),
    Interest.create({ category: 'Business' }),
    Interest.create({ category: 'Cooking' }),
    Interest.create({ category: 'Science' }),
    Interest.create({ category: 'Technology' }),
    Interest.create({ category: 'Parenting' })
  ])
  console.log(`seeded ${interests.length} interests`)

  const users = await Promise.all([
    User.create({ username: 'cody101', location: 'United States', continent: 'North America', gender: 'M', email: 'cody@email.com', password: '123', image: '/avatar-guy-01.png' })
      .then(user => user.setInterests([interests[0], interests[3]])),
    User.create({ username: 'murphy', location: 'England', continent: 'Europe', gender: 'M', email: 'murphy@email.com', password: '123', image: '/avatar-guy-02.png' })
      .then(user => user.setInterests([interests[0], interests[5]])),
    User.create({ username: 'hkeller', location: 'France', continent: 'Europe', gender: 'F', email: 'helenkeller@gmail.com', password: '123', image: '/avatar-girl-01.png' })
      .then(user => user.setInterests([interests[4], interests[5]])),
    User.create({ username: 'aearhart', location: 'United States', continent: 'North America', gender: 'F', email: 'aearhart@gmail.com', password: '123', image: '/avatar-girl-02.png' })
      .then(user => user.setInterests([interests[4], interests[5]])),
    User.create({ username: 'ahepburn', location: 'England', continent: 'Europe', gender: 'F', email: 'ahepburn@gmail.com', password: '123', image: '/panda.png' })
      .then(user => user.setInterests([interests[4], interests[5]])),

  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)

  const penpals = await Promise.all([
    Penpal.create({
      accepted: true,
      userId: 1,
      friendId: 2
    }),
    Penpal.create({
      accepted: true,
      userId: 2,
      friendId: 1
    }),
    Penpal.create({
      accepted: true,
      userId: 2,
      friendId: 3
    }),
    Penpal.create({
      accepted: true,
      userId: 3,
      friendId: 2
    })
  ])
  console.log(`seeded ${penpals.length} penpals`)

  const messages = await Promise.all([
    Message.create({
      content: 'I was very pleased to hear that you have been offered a position at the Garnet Company after graduation.You have my heartfelt congratulations both on graduating and earning your new position. I know that Garnet Company was one of the “Top 3” employers you’d hoped that you could work for, so you must be beyond thrilled to be onboarding with them! These are exciting changes, and I\'m sure you will meet the challenges they bring with your usual optimism, creativity, and capability. I wish you all the best as you move forward in your new career.',
      fromLocation: 'United States',
      toLocation: 'England',
      fromContinent: 'North America',
      toContinent: 'Europe',
      status: 'SENT',
      senderId: 2,
      receiverId: 1
    }),

    Message.create({
      content: 'How wonderful to learn that all of your hard work at XYZ University has paid off in your new job offer. It has been a pleasure to work with you over the course of the past two years – your dedication to your studies and your willingness to help your peers has truly contributed to the productivity and morale of our department.',
      fromLocation: 'France',
      toLocation: 'England',
      fromContinent: 'Europe',
      toContinent: 'Europe',
      status: 'SENT',
      senderId: 3,
      receiverId: 2
    }),

    Message.create({
      content: 'Congratulations on your retirement! You have been a dedicated and appreciated employee of the Pajath Company for 25 years, and I\'m happy that you have this opportunity to spend some time with your family before you embark on your next venture.',
      fromLocation: 'France',
      toLocation: 'England',
      fromContinent: 'Europe',
      toContinent: 'Europe',
      status: 'DELIVERED',
      senderId: 3,
      receiverId: 2
    }),

    Message.create({
      content: 'Congratulations on your retirement from Helpful House. You have made such a difference in the lives of so many children when they needed someone most. It\'s wonderful that you will continue helping people through your volunteer work, and be able to spend more time with those adorable grandchildren. We will all miss your smiling face and hope that you\'ll drop by to visit when you have time.',
      fromLocation: 'France',
      toLocation: 'England',
      fromContinent: 'Europe',
      toContinent: 'Europe',
      status: 'DRAFT',
      senderId: 3,
      receiverId: 2
    }),
  ])
  console.log(`seeded ${messages.length} messsages`)

  const preferences = await Promise.all([
    Preference.create({
      gender: 'M',
      location: 'China',
      userId: 1
    }),
    Preference.create({
      gender: 'F',
      location: 'France',
      userId: 2
    }),
    Preference.create({
      gender: 'M',
      location: 'England',
      userId: 3
    })
  ])
  console.log(`seeded ${preferences.length} preferences`)

  const delivery = await Promise.all([
    Delivery.create({
      fromContinent: 'North America',
      toContinent: 'North America',
      timeDuration: 259200000
    }),

    Delivery.create({
      fromContinent: 'North America',
      toContinent: 'South America',
      timeDuration: 432000000
    }),

    Delivery.create({
      fromContinent: 'North America',
      toContinent: 'Europe',
      timeDuration: 604800000
    }),

    Delivery.create({
      fromContinent: 'North America',
      toContinent: 'Africa',
      timeDuration: 604800000
    }),

    Delivery.create({
      fromContinent: 'North America',
      toContinent: 'Asia',
      timeDuration: 864000000
    }),

    Delivery.create({
      fromContinent: 'North America',
      toContinent: 'Australia',
      timeDuration: 864000000
    }),

    Delivery.create({
      fromContinent: 'Europe',
      toContinent: 'Europe',
      timeDuration: 259200000
    }),

    Delivery.create({
      fromContinent: 'Europe',
      toContinent: 'North America',
      timeDuration: 604800000
    }),
  ])
  console.log(`seeded ${delivery.length} deliveries`)
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
