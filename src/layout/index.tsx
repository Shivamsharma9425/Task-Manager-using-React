import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const Layout = () => {
	return (
		<div className="w-screen h-screen relative">
			<Navbar />
			<div className=" px-[15px] exm:px-[30px] sm:px-[40px] md:px-[60px] pt-[20px] sm:pt-[40px] w-full h-full overflow-y-scroll bg-gradient-to-r from-[#222831] to-[#31363F]">
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;