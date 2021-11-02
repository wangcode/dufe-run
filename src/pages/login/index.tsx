import { useEffect } from 'react';
import { Spin } from 'antd';
import { useSearchParam } from 'react-use';
import {useHistory} from "react-router-dom"

const Login = () => {

  const history = useHistory();
  const token = useSearchParam("token")
  const refreshToken = useSearchParam("refreshToken")

  useEffect(() => {
    if (token && refreshToken) {
      localStorage.setItem("token", token)
      history.replace("/")
      localStorage.setItem("refreshToken", refreshToken)
      window.location.replace("/webview")
    }
  }, [token, refreshToken])

  return (
    <Spin spinning={true}>
      <div style={{ width: "100vw", height: "100vh" }} />
    </Spin>
  )
}

export default Login;
