import { useEffect } from 'react';
import { Spin } from 'antd';
import { useHistory } from 'react-router-dom';
import { useSearchParam } from 'react-use';


const Login = () => {

  const history = useHistory()

  const token = useSearchParam("token")

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token || "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJqd3RfdG9rZW4iLCJpYXQiOjE2MzUxMjMyOTAsInN1YiI6IntcIm9wZW5JZFwiOlwiMjkzXCIsXCJsb2dpbkRhdGVcIjpcIjIwMjEtMTAtMjUgMDg6NTQ6NTBcIixcIm9yZ0lkXCI6XCIxZDdkOThkMmE2N2Q0Zjc0YWE0OWE3OTdmNjMwYjI3YlwiLFwib3JnQ29kZVwiOlwiZHVmZVwiLFwidXNlck1vYmlsZVwiOlwiMTU2MTQ0NzIxMDZcIixcInVzZXJOYW1lXCI6XCIxNTYxNDQ3MjEwNlwiLFwidXNlcklkXCI6XCIxYzdkNmYxYjk5ZmM0MjJkOTk5NWM0ZWU2NjI0ZjNlMlwiLFwibmFtZVwiOlwi6bqm5Y-vXCIsXCJ1c2VyTWFjXCI6XCIyMTE0MDMxOTk2MTAyMjgyMTZcIn0iLCJleHAiOjE2Mzc3MTUyOTB9.eQ5KyRur9UNXkQpGCV0PAfrgErB3Z8mqbnSwyieGA28")
      history.replace("/")
    }
  }, [history, token])

  return (
    <Spin spinning={true}>
      <div style={{ width: "100vw", height: "100vh" }} />
    </Spin>
  )
}

export default Login;
