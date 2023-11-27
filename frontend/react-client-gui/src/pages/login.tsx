import { useState, useEffect } from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { AppDispatch, RootState } from "../app/store";
import { HeaderSignIn } from "../components/HeaderSignIn";
import { getMessages } from "../features/messages/messagesSlice";

export default function LoginPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const [passwordShown, setPasswordShown] = useState(false);
	const togglePasswordVisiblity = () => {
		setPasswordShown(passwordShown ? false : true);
	};

	const [formData, setFormData] = useState({
		email: "",
		username: "",
		password: "",
	});

	const { email, username, password } = formData;

	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state: RootState) => state.auth
	);

	useEffect(() => {
		if (isError) {
			toast.error("Incorrect Username or Password");
		}

		if (isSuccess && user) {
			let welcomeMessage = "Welcome " + user.first_name + " " + user.last_name;
			toast.success(welcomeMessage);
			dispatch(getMessages(user.token));
			navigate("/user");
		}

		dispatch(reset());
	}, [user, isError, isSuccess, message, navigate, dispatch]);

	const onChange = (e: { target: { name: any; value: any } }) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault();

		const userData = {
			email,
			username,
			password,
		};

		dispatch(login(userData));
	};

	return (
		<>
			<HeaderSignIn />
			{/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
			<div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
				<div className="w-full max-w-md space-y-8">
					<div>
						<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
							Sign in to your account
						</h2>
						<p className="mt-2 text-center text-sm text-gray-600">
							Or{" "}
							<Link
								to="/register"
								className="font-medium text-indigo-600 hover:text-indigo-500"
							>
								Sign Up
							</Link>
						</p>
					</div>
					<form className="mt-8 space-y-6" action="#" method="POST">
						<input
							type="hidden"
							name="remember"
							defaultValue="true"
							onChange={onChange}
						/>
						<div className="-space-y-px rounded-md shadow-sm">
							<div>
								<label htmlFor="email-address" className="sr-only">
									Email address
								</label>
								<input
									id="email-address"
									name="email"
									type="email"
									autoComplete="email"
									required
									className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
									placeholder="Email address"
									onChange={onChange}
								/>
							</div>
							<div>
								<div className="relative block w-full  ">
									<label htmlFor="password" className="sr-only">
										Password
									</label>

									<input
										id="password"
										name="password"
										type={passwordShown ? "text" : "password"}
										autoComplete="current-password"
										required
										placeholder="Password"
										onChange={onChange}
										className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm text-gray-900 placeholder-gray-500 mr-6 "
									/>
								</div>
							</div>
						</div>

						<div className=" items-center justify-between flex flex-col gap-1 flex-cols-1">
							<div className=" flex items-left row-span-full">
								<input
									id="show-password"
									name="show-password"
									type="checkbox"
									onChange={togglePasswordVisiblity}
									className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
								/>
								<label
									htmlFor="show-password"
									className="ml-2 block text-sm text-gray-900"
								>
									Show Password
								</label>
							</div>
						</div>

						<div>
							<button
								type="submit"
								onClick={onSubmit}
								className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							>
								<span className="absolute inset-y-0 left-0 flex items-center pl-3">
									<LockClosedIcon
										className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
										aria-hidden="true"
									/>
								</span>
								Sign in
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
