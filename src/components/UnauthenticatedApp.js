import { Switch, Route, Redirect } from "react-router-dom"
import Login from "../features/auth/Login"
import Signup from "../features/auth/Signup"

export default function UnauthenticatedApp() {
    return (
        <Switch>
            <Route exact path="/">
                <Login />
            </Route>
            <Route exact path="/signup">
                <Signup />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}