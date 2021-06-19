import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./authUtils";

const TeacherRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated().user_type === 2 ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
};

export default TeacherRoute;

// && isAuthenticated().user_type==1