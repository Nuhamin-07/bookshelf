/** @jsx jsx */
import { jsx } from '@emotion/core'

import * as React from 'react'
// 🐨 you're going to need this:
import * as auth from 'auth-provider'
import { AuthenticatedApp } from './authenticated-app'
import { UnauthenticatedApp } from './unauthenticated-app'
import { client } from 'utils/api-client.exercise'
import { useAsync } from "./utils/hooks"
import * as colors from "./styles/colors"
import { FullPageSpinner } from "./components/lib"

async function getUser() {
  let user = null

  const token = await auth.getToken()
  if (token) {
    const data = await client("me", { token })
    user = data.user
  }
  return user
}

function App() {
  const { data: user, error, isLoading, isIdle, isSuccess, isError, run, setData } = useAsync()
  // const [user, setUser] = React.useState(null)

  React.useEffect(() => {
    run(getUser())
  }, [run])

  const login = form => auth.login(form).then(user => setData(user))
  const register = form => auth.register(form).then(user => setData(user))
  const logout = () => {
    auth.logout()
    setData(null)
  }

  if (isLoading || isIdle) {
    return <FullPageSpinner />
  }

  // if (isError) {
  //   return (
  //     <div css={{
  //       color: colors.danger,
  //       height: "100vh",
  //       display: "flex",
  //       flexDirection: "column",
  //       justifyContent: "center",
  //       alignItems: "center"
  //     }}>
  //       <p>There is an error</p>
  //       <pre>{error.message}</pre>
  //     </div>
  //   )
  // }

  // if (isSuccess) {
  return user ? <AuthenticatedApp user={user} logout={logout} /> : <UnauthenticatedApp login={login} register={register} />
  // }


}

export { App }

/*
eslint
  no-unused-vars: "off",
*/
