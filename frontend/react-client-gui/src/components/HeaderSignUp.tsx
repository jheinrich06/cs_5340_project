import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Link } from "react-router-dom";

function MobileNavLink({ children }: { children: React.ReactNode }) {
	return (
		<Popover.Button className="block w-full p-2">{children}</Popover.Button>
	);
}

function MobileNavIcon({ open }: { open: any }) {
	return (
		<svg
			aria-hidden="true"
			className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
			fill="none"
			strokeWidth={2}
			strokeLinecap="round"
		>
			<path
				d="M0 1H14M0 7H14M0 13H14"
				className={clsx(
					"origin-center transition",
					open && "scale-90 opacity-0"
				)}
			/>
			<path
				d="M2 2L12 12M12 2L2 12"
				className={clsx(
					"origin-center transition",
					!open && "scale-90 opacity-0"
				)}
			/>
		</svg>
	);
}

function MobileNavigation() {
	return (
		<Popover>
			<Popover.Button
				className="relative z-10 flex h-8 w-8 items-center justify-center [&:not(:focus-visible)]:focus:outline-none"
				aria-label="Toggle Navigation"
			>
				{({ open }) => <MobileNavIcon open={open} />}
			</Popover.Button>
			<Transition.Root>
				<Transition.Child
					as={Fragment}
					enter="duration-150 ease-out"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="duration-150 ease-in"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<Popover.Overlay className="fixed inset-0 bg-slate-300/50" />
				</Transition.Child>
				<Transition.Child
					as={Fragment}
					enter="duration-150 ease-out"
					enterFrom="opacity-0 scale-95"
					enterTo="opacity-100 scale-100"
					leave="duration-100 ease-in"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-95"
				>
					<Popover.Panel
						as="div"
						className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5"
					>
						<MobileNavLink>
							<Link to="/login">Sign In</Link>
						</MobileNavLink>
						{/* <MobileNavLink href="#testimonials">Testimonials</MobileNavLink> */}
						<hr className="m-2 border-slate-300/40" />
					</Popover.Panel>
				</Transition.Child>
			</Transition.Root>
		</Popover>
	);
}

export function HeaderSignUp() {
	return (
		<header className="py-5">
			{/* <Container   > */}
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<nav className="relative z-50 flex justify-between">
					<div className="flex items-center gap-x-5 md:gap-x-8">
						<Link
							to="/login"
							className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 border border-transparent bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600"
						>
							Sign In
						</Link>
						<div className="-mr-1 md:hidden">
							<MobileNavigation />
						</div>
					</div>
				</nav>
			</div>
			{/* </Container> */}
		</header>
	);
}
