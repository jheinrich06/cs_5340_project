import { useState, useEffect } from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { AppDispatch, RootState } from "../app/store";
import { RegistrationModel } from "../models/registration.model";
import { HeaderSignUp } from "../components/HeaderSignUp";

export default function RegisterPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const [passwordShown, setPasswordShown] = useState(false);
	const togglePasswordVisiblity = () => {
		setPasswordShown(passwordShown ? false : true);
	};

	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		username: "",
		email: "",
		password: "",
		password_check: "",
	});

	const { first_name, last_name, username, email, password, password_check } =
		formData;

	const { user, isError, isSuccess, message } = useSelector(
		(state: RootState) => state.auth
	);

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		if (isSuccess || user) {
			navigate("/");
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

		if (password !== password_check) {
			toast.error("Passwords do not match");
		} else {
			const userData: RegistrationModel = {
				first_name,
				last_name,
				username,
				email,
				password,
			};
			dispatch(register(userData));
		}
	};

	return (
		<>
			<HeaderSignUp />
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
							Sign up
						</h2>
					</div>
					<form className="mt-8 space-y-6" action="#" method="POST">
						<input
							type="hidden"
							name="remember"
							defaultValue="true"
							onChange={onChange}
						/>
						<div className="-space-y-px rounded-md shadow-sm mt-10 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2">
							<div className="block w-full appearance-none rounded-md">
								<label className="mb-3 block text-sm font-medium text-gray-700">
									First Name
								</label>

								<label htmlFor="first_name" className="sr-only">
									First name
								</label>
								<input
									id="first_name"
									name="first_name"
									type="first_name"
									autoComplete="first_name"
									required
									className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
									placeholder="First name"
									onChange={onChange}
								/>
							</div>

							<div className="block w-full appearance-none rounded-md">
								<label className="mb-3 block text-sm font-medium text-gray-700">
									Last Name
								</label>

								<label htmlFor="last_name" className="sr-only">
									Last name
								</label>
								<input
									id="last_name"
									name="last_name"
									type="last_name"
									autoComplete="last_name"
									required
									className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
									placeholder="Last name"
									onChange={onChange}
								/>
							</div>

							<div className="block w-full appearance-none rounded-md">
								<label className="mb-3 block text-sm font-medium text-gray-700">
									Username
								</label>

								<label htmlFor="username" className="sr-only">
									Username
								</label>
								<input
									id="username"
									name="username"
									type="username"
									autoComplete="username"
									required
									className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
									placeholder="Username"
									onChange={onChange}
								/>
							</div>

							<div className="block w-full appearance-none rounded-md col-span-full">
								<label className="mb-3 block text-sm font-medium text-gray-700">
									Email Address
								</label>

								<label
									htmlFor="email-address"
									className="sr-only col-span-full"
								>
									Email address
								</label>
								<input
									id="email-address"
									name="email"
									type="email"
									autoComplete="email"
									required
									className="col-span-full relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
									placeholder="Email address"
									onChange={onChange}
								/>
							</div>

							<div className="block w-full appearance-none rounded-md col-span-full">
								<label className="mb-3 block text-sm font-medium text-gray-700">
									Password
								</label>

								<label htmlFor="password" className="sr-only col-span-full">
									Password
								</label>
								<input
									id="password"
									name="password"
									type={passwordShown ? "text" : "password"}
									autoComplete="current-password"
									required
									className="col-span-full relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
									placeholder="Password"
									onChange={onChange}
								/>
							</div>

							<div className="block w-full appearance-none rounded-md col-span-full">
								<label className="mb-3 block text-sm font-medium text-gray-700">
									Confirm Password
								</label>

								<input
									id="password_check"
									name="password_check"
									type={passwordShown ? "text" : "password"}
									required
									className="col-span-full relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
									placeholder="Confirm Password"
									onChange={onChange}
								/>
							</div>
						</div>

						<div className="flex items-center justify-between">
							<div className="flex items-center">
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
								Sign up
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
