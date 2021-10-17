import { Spin } from 'antd';
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';


const Login = () => {

    const location = useLocation()
    const history = useHistory()

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        // const token = params.get("token")
        const token = "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJqd3RfdG9rZW4iLCJpYXQiOjE2MzEyNDA0ODIsInN1YiI6IntcIm9wZW5JZFwiOlwiMjkzXCIsXCJsb2dpbkRhdGVcIjpcIjIwMjEtMDktMTAgMTA6MjE6MjJcIixcIm9yZ0lkXCI6XCIxZDdkOThkMmE2N2Q0Zjc0YWE0OWE3OTdmNjMwYjI3YlwiLFwib3JnQ29kZVwiOlwiZHVmZVwiLFwidXNlck1vYmlsZVwiOlwiMTU2MTQ0NzIxMDZcIixcInVzZXJOYW1lXCI6XCIxNTYxNDQ3MjEwNlwiLFwidXNlcklkXCI6XCIxYzdkNmYxYjk5ZmM0MjJkOTk5NWM0ZWU2NjI0ZjNlMlwiLFwibmFtZVwiOlwi6bqm5Y-vXCIsXCJ1c2VyTWFjXCI6XCIyMTE0MDMxOTk2MTAyMjgyMTZcIn0iLCJleHAiOjE2MzM4MzI0ODJ9.B5736jMvlp1Nal-tcAFc7Yq8o7sRWB6eVtFgXF9bSjI"

        if(token) {
            localStorage.setItem("token", token)
            history.replace("/")
        }


    }, [location])


    return <Spin spinning={true} />


}

export default Login;