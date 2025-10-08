import './Home.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

/**
 * A React component that shows a form the user can use to create a new message, as well as a list of any pre-existing messages.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const AboutUs = props => {
  const [paragraph, setParagraph] = useState('')
  const [image, setImage] = useState('')
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')

  /**
   * A nested function that fetches messages from the back-end server.
   */
  const fetchAboutUs = () => {
    // setMessages([])
    // setLoaded(false)
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/about-us`)
      .then(response => {
        // axios bundles up all response data in response.data property
        const paragraph = response.data.paragraph
        const image = response.data.image
        setParagraph(paragraph)
        setImage(image)
      })
      .catch(err => {
        const errMsg = JSON.stringify(err, null, 2) // convert error object to a string so we can simply dump it to the screen
        setError(errMsg)
      })
      .finally(() => {
        // the response has been received, so remove the loading icon
        setLoaded(true)
      })
  }


  // set up loading data from server when the component first loads
  useEffect(() => {
    // fetch about us this once
    fetchAboutUs()
    // return a function that will be called when this component unloads
    return e => {
      // clear the timer, so we don't still load messages when this component is not loaded anymore
    }
  }, []) // putting a blank array as second argument will cause this function to run only once when component first loads

  return (
    <>
      <h1>About Us!</h1>

      <p>{paragraph} </p>

      <img src={image} alt="A cat with feline leukemia virus" />

    </>
  )
}

// make this component available to be imported into any other file
export default AboutUs