import { useEffect } from 'react';
import { Spin } from 'antd';
import { useHistory } from 'react-router-dom';
import { useSearchParam } from 'react-use';


const Login = () => {

  const history = useHistory()

  const token = useSearchParam("token")

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token)
      window.location.href = "/webview"
    }
  }, [history, token])

  return (
    <Spin spinning={true}>
      <div style={{ width: "100vw", height: "100vh" }} />
    </Spin>
  )
}

export default Login;
