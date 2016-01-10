Questions = new Mongo.Collection('questions') // eslint-disable-line

const QuestionSchema = new SimpleSchema({
  content: {
    type: String
  },
  isAnon: {
    type: Boolean
  },
  authorId: {
    type: String
  },
  recipientId: {
    type: String
  },
  answerCount: {
    type: Number
  }
})

Questions.attachSchema(QuestionSchema)
