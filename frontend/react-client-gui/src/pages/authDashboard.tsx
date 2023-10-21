import AuthDashboardHeader from "../components/authDashboardHeader";
import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import {
	ChatBubbleLeftEllipsisIcon,
	TagIcon,
	UserCircleIcon,
} from "@heroicons/react/20/solid";
import { toast } from "react-toastify";

const activity = [
	{
		id: 1,
		type: "comment",
		person: { name: "Eduardo Benz", href: "#" },
		imageUrl:
			"https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
		comment:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. ",
		date: "6d ago",
	},
	{
		id: 4,
		type: "comment",
		person: { name: "Jason Meyers", href: "#" },
		imageUrl:
			"https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
		comment:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. Scelerisque amet elit non sit ut tincidunt condimentum. Nisl ultrices eu venenatis diam.",
		date: "2h ago",
	},
];

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export default function AuthDashboard() {
	const dispatch = useDispatch<AppDispatch>();

	const navigate = useNavigate();

	const { user, isError, message } = useSelector(
		(state: RootState) => state.auth
	);

	useEffect(() => {
		if (!user) {
			navigate("/");
		}

		if (isError) {
			toast.error(message);
		}

		return () => {};
	}, [user, isError, message, dispatch, navigate]);

	return (
		<>
			<AuthDashboardHeader />
			<div className="flow-root">
				<ul role="list" className="-mb-8">
					{activity!.map((activityItem, activityItemIdx) => (
						<li key={activityItem.id}>
							<div className="relative pb-8">
								{activityItemIdx !== activity.length - 1 ? (
									<span
										className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
										aria-hidden="true"
									/>
								) : null}
								<div className="relative flex items-start space-x-3">
									{activityItem.type === "comment" ? (
										<>
											<div className="relative">
												<img
													className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
													src={activityItem.imageUrl}
													alt=""
												/>

												<span className="absolute -bottom-0.5 -right-1 rounded-tl bg-white px-0.5 py-px">
													<ChatBubbleLeftEllipsisIcon
														className="h-5 w-5 text-gray-400"
														aria-hidden="true"
													/>
												</span>
											</div>
											<div className="min-w-0 flex-1">
												<div>
													<div className="text-sm">
														<a
															href={activityItem.person.href}
															className="font-medium text-gray-900"
														>
															{activityItem.person.name}
														</a>
													</div>
													<p className="mt-0.5 text-sm text-gray-500">
														Commented {activityItem.date}
													</p>
												</div>
												<div className="mt-2 text-sm text-gray-700">
													<p>{activityItem.comment}</p>
												</div>
											</div>
										</>
									) : null}
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</>
	);
}
