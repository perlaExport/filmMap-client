import React, { useReducer, createContext } from "react";

export type authenticationStatus = "failed" | "success" | null;

type userAuthType = {
    authStatus: authenticationStatus,
    user: string | undefined
}
const initialState = { authStatus: null, user: undefined };

export const UserContext = createContext<[ userAuthType, React.Dispatch<any>]>([initialState, () => null]);

const reducer = (state: any, { type, payload }: {type: string, payload: any}) => {
	switch (type) {
		case "LOGIN_SUCCESS":
			!!payload.token && localStorage.setItem("token", payload.token);
			return { ...state, user: payload.user, authStatus: "success" };
		case "LOGIN_FAIL":
			localStorage.removeItem("token");
			return { ...state, user: null, authStatus: "failed" };
		case "LOGOUT":
			localStorage.removeItem("token");
			return { ...state, user: null, authStatus: null };
		default:
			return state;
	}
};

export const UserProvider = ({ children }: {children: any}) => {
	const [user, dispatchUser] = useReducer(reducer, initialState);
	return <UserContext.Provider value={[user, dispatchUser]}>{children}</UserContext.Provider>;
};