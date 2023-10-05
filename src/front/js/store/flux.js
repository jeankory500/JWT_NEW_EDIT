const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: null,
			token: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			syncTokenFromSessionStore: () => {
				const token = sessionStorage.getItem("token");
				console.log("Application just loaded, syncing session storage token");
				if (token && token !== "" && token !== undefined) setStore({ token: token });
			},

			userSignup: async(email, password) => {
				const resp = await("https://curly-adventure-w6qw7g9w45pc5w94-3001.app.github.dev/signup", "POST", {email, password})
				if(resp.code >= 400) {
					return resp
				}
				//setStore({accessToken: resp.data.accessToken})
				localStorage.setItem("accessToken", resp.data.accessToken)
				return resp
			},

			logout: () => {
				sessionStorage.removeItem("token");
				console.log("Logging Out");
				setStore({ token: null });
			},

			login: async (email, password) => {
				const opts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						"email": email,
						"password": password,
					}),
				};

				try {
					const resp = await fetch("https://curly-adventure-w6qw7g9w45pc5w94-3001.app.github.dev/api/token", opts);
					if(resp.status !== 200) {
						alert("There was an error");
						return false;
					}
					
					const data = await resp.json();
					sessionStorage.setItem("token", data.access_token);
					setStore({ token: data.access_token });
					return true;
				} catch(error) {
					console.error("Login error", error);
				}
			},

			

			
		}
	};
};

export default getState;

