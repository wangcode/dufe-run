import { useEffect } from 'react';
import { Spin } from 'antd';
import { useSearchParam } from 'react-use';


const Login = () => {

  const token = useSearchParam("token")

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token)
      window.location.replace("/webview")
    }
  }, [token])

  return (
    <Spin spinning={true}>
      <div style={{ width: "100vw", height: "100vh" }} />
    </Spin>
  )
}

export default Login;
