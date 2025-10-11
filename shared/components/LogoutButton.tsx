import useLogoutMutation from "shared/hooks/useLogoutMutation";
import Button from "./ui/button";

export default function LogoutButton() {
	const mutation = useLogoutMutation();
	const handleLogout = () => {		
		mutation.mutate();
	};

	return <Button onClick={handleLogout}>Log out</Button>;
}
