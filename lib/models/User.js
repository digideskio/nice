Users = Meteor.users

const userProfileSchema = new SimpleSchema({
  bio: {
    type: String,
    max: 141,
    min: 1,
    optional: true
  }
})

const UserSchema = new SimpleSchema({
  username: {
    type: String,
    min: 2,
    max: 30
  },
  emails: {
    type: [Object]
  },
  'emails.$.address': {
    type: String
  },
  'emails.$.verified': {
    type: Boolean
  },
  createdAt: {
    type: Date
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true
  },
  roles: {
    type: [String],
    optional: true
  },
  profile: {
    type: userProfileSchema
  },
  following: {
    type: [String]
  },
  followers: {
    type: [String]
  }
})

Users.attachSchema(UserSchema)

Users.helpers({
  gravatar (size) {
    return Gravatar.imageUrl(this.emails[0].address, {size})
  },
  isFollowedByCurrent () {
    return _.contains(this.followers, Meteor.userId())
  }
})
