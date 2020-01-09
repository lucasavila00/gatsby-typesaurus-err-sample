import React, { useState } from "react"
import { useFirebase } from "gatsby-plugin-firebase"
import { collection, get, } from 'typesaurus'

type User = { name: string }
const users = collection<User>('users')

export default () => {
  const [username, setUsername] = useState("loading...")
  useFirebase(() => {
    // if the hook is called then firebase is loaded
    // and ready to use, which happens only at runtime.
    // When building the static site (it does SSR and saves it as an HTML file)
    // the hook won't be called.
    get(users, '42').then(user => {
      setUsername(user.data.name)
    })

  }, [])
  return <div>username is {username}</div>
}
