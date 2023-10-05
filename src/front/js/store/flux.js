const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
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

			signup: async (email, password) => {
				const opts = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email: email,
						password: password,
					}),
				};
				
				try {
					const resp = await fetch(`${[YOUR_BACKEND_URL]}/api/signup`, opts);
					if (resp.status === 201) {
						console.log("Signup successful!");
					} else {
						console.error("Signup failed");
					}
				} catch (error) {
					console.error("Error during signup", error);
				}
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
					const resp = await fetch("https://obscure-robot-x6gjwv9jxq926xrr-3001.app.github.dev/api/token", opts);
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

			getMessage: async () => {
				try{
					const resp = await fetch(`$https://obscure-robot-x6gjwv9jxq926xrr-3001.app.github.dev/api/hello`);
					const data = await resp.json();
					setStore({ message: data.message });
					return data;
				} catch(error) {
					console.error("Error loading message from backend", error);
				}
			},

			
		}
	};
};

export default getState;
