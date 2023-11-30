import AuthDashboardHeader from "../components/authDashboardHeader";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { toast } from "react-toastify";
import { getMessages, sendMessage } from "../features/messages/messagesSlice";
import jwt from "jwt-decode";
import Cookies from "universal-cookie";

export default function AuthDashboard() {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const { user, isError, message } = useSelector(
		(state: RootState) => state.auth
	);

	useEffect(() => {
		if (user == null) {
			navigate("/");
		}

		if (isError) {
			toast.error(message);
		}

		return () => {};
	}, [user, isError, message, dispatch, navigate]);

	const cookies = new Cookies();
	const [formData, setFormData] = useState({
		sent_message: "",
	});

	const { sent_message } = formData;
	const date_now = new Date();

	const { messages } = useSelector((state: RootState) => state.messages);

	let [isPopulated, setIsPopulated] = useState(false);

	useEffect(() => {
		if (messages.length > 0) {
			setIsPopulated(true);
		}

		if (messages?.length > 0) {
			setIsPopulated(true);
		}

		if (messages.length === 0) {
			setIsPopulated(false);
		}
	}, [messages]);

	{
		/*
	useEffect(() => {
		if (user != null) {
			const interval = setInterval(() => {
				dispatch(getMessages(user.token));
			}, 60000);

			return () => clearInterval(interval);
		}
	}, [user, dispatch]);
*/
	}

	const onChange = (e: { target: { name: any; value: any } }) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault();

		const commentData = {
			_id: "",
			sender_id: user._id,
			sender_first_name: user.first_name,
			sender_last_name: user.last_name,
			sender_username: user.username,
			sent_message: sent_message,
			time_sent: date_now,
		};

		dispatch(sendMessage(commentData));
	};

	return (
		<>
			<AuthDashboardHeader />
			{isPopulated ? (
				<div className="flow-root">
					<ul role="list" className="-mb-8">
						{messages!.map((message, messagesIdx) => (
							<li key={message._id}>
								<div className="relative pb-8">
									{messagesIdx !== messages.length - 1 ? (
										<span
											className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
											aria-hidden="true"
										/>
									) : null}
									<div className="relative flex items-start space-x-3">
										<>
											<div className="relative">
												<span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-500">
													<span className="font-medium leading-none text-white">
														{message.sender_first_name.slice(0, 1) +
															message.sender_last_name.slice(0, 1)}
													</span>
												</span>
											</div>
											<div className="min-w-0 flex-1">
												<div>
													<div className="text-sm">
														<p>{message.sender_username} </p>
													</div>
													<div className="text-sm">
														<p className="mt-0.5 text-sm text-gray-500">
															Commented at {message.time_sent.toLocaleString()}
														</p>
													</div>
												</div>
												<div className="mt-2 text-sm text-gray-700">
													<p>{message.sent_message}</p>
												</div>
											</div>
										</>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			) : (
				<div className="text-center overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 ">
					<div className="text-center relative grid gap-6 bg-white px-5 py-2 sm:gap-8 sm:p-8 ">
						<div className="text-center justify-center">
							<h3 className="text-center mt-2 text-sm font-medium text-gray-900">
								No messages to display
							</h3>
							<p className="text-center mt-1 text-sm text-gray-500">
								Get started by posting to the board!
							</p>
						</div>
					</div>
				</div>
			)}
			<form action="#" method="POST">
				<label htmlFor="sent_message" className="sr-only">
					Comment
				</label>
				<div>
					<textarea
						rows={5}
						name="sent_message"
						id="sent_message"
						className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						placeholder="Add your comment..."
						onChange={onChange}
						defaultValue={""}
					/>
				</div>
				<div className="mt-2 flex justify-end">
					<button
						type="submit"
						onClick={onSubmit}
						className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Post
					</button>
				</div>
			</form>
		</>
	);
}
