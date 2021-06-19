import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./authUtils";

const StudentRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated().user_type === 1 ? (
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

export default StudentRoute;

// && isAuthenticated().user_type==1