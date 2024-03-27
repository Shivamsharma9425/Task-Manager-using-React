import { Person } from "react-ionicons";

const Navbar = () => {
	return (
		<div className=" w-full flex top-0 items-center justify-between exm:pl-10 sm:pl-14 lg:pl-20 pr-6 sm:h-[100px] md:h-[130px] h-[70px] esm:h-[130] bg-gradient-to-r from-[#222831] to-[#31363F]">
				<span className="text-white font-bold exm:text-3xl sm:text-4xl md:text-5xl text-2xl md:ml-16 ml-9 mt-6">
					Task Board
				</span>
			<div className="md:flex hidden sm:mx-6 md:mx-16 lg:mx-28 items-center ">
				<div className="bg-white rounded-full items-center w-[70px] pt-[10px] pl-[10px] h-[70px] border-0 p-0 object-cover">
				<Person
					color={'#000'} 
					width={"50px"}
					height={"50px"}
				/>
				</div>
			</div>
		</div>
	);
};

export default Navbar;