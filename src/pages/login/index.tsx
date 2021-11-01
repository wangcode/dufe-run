import { useEffect } from 'react';
import { Spin } from 'antd';
import { useSearchParam } from 'react-use';
import {useHistory} from "react-router-dom"

const Login = () => {

  const history = useHistory();
  const token = useSearchParam("token")

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token)
      history.replace("/")
    }
  }, [token])

  return (
    <Spin spinning={true}>
      <div style={{ width: "100vw", height: "100vh" }} />
    </Spin>
  )
}

export default Login;
