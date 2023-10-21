import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { toast } from "react-toastify";

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export default function AuthDashboardHeader() {
	const { user } = useSelector((state: RootState) => state.auth);

	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	function logoutClick() {
		dispatch(logout());
		toast.success("User Logged out");
		navigate("/");
	}

	function viewProfile() {
		navigate("/userProfile");
	}

	return (
		<Disclosure as="nav" className="bg-white shadow">
			{({ open }) => (
				<>
					<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 left-0">
						<div className="relative flex h-16 right-0">
							<div className=" absolute inset-y-0 left-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
								{/* Profile dropdown */}
								<Menu
									as="div"
									className=" left-0 justify-end relative ml-11 p-11"
								>
									<div>
										<Menu.Button className="justify-right flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
											<span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-500">
												<span className="font-medium leading-none text-white">
													{user.first_name.slice(0, 1) +
														user.last_name.slice(0, 1)}
												</span>
											</span>
										</Menu.Button>
									</div>
									<Transition
										as={Fragment}
										enter="transition ease-out duration-200"
										enterFrom="transform opacity-0 scale-95"
										enterTo="transform opacity-100 scale-100"
										leave="transition ease-in duration-75"
										leaveFrom="transform opacity-100 scale-100"
										leaveTo="transform opacity-0 scale-95"
									>
										<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
											<Menu.Item>
												{({ active }) => (
													<button
														onClick={viewProfile}
														className={classNames(
															active ? "bg-gray-100" : "",
															"block px-4 py-2 text-sm text-gray-700"
														)}
													>
														Your Profile
													</button>
												)}
											</Menu.Item>
											<Menu.Item>
												{({ active }) => (
													<button
														onClick={logoutClick}
														className={classNames(
															active ? "bg-gray-100" : "",
															"block px-4 py-2 text-sm text-gray-700"
														)}
													>
														Sign out
													</button>
												)}
											</Menu.Item>
										</Menu.Items>
									</Transition>
								</Menu>
							</div>
						</div>
					</div>
				</>
			)}
		</Disclosure>
	);
}
