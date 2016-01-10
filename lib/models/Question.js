Questions = new Mongo.Collection('questions') // eslint-disable-line

const QuestionSchema = new SimpleSchema({
  content: {
    type: String
  },
  isAnon: {
    type: Boolean,
    optional: true
  },
  authorId: {
    type: String,
    optional: true
  },
  recipientId: {
    type: String,
    optional: true
  },
  answerCount: {
    type: Number,
    optional: true,
    defaultValue: 0
  }
})

Questions.attachSchema(QuestionSchema)
