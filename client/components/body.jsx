const description = `
nice is a minimal question-and-answer platform. There's zero unneeded features,
only the stuff you need. It's focused on performance and user-friendliness.
`

Body = React.createClass({
  render () {
    return (
      <div className='container'>
        <div className='columns'>
          <div className='five-fifths column centered'>
            <h1>Ask questions. Get answers. Nice.</h1>
            <p className='lead'>{description}</p>
          </div>
        </div>
      </div>
    )
  }
})
