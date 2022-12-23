import { Admin, Resource, defaultTheme } from "react-admin";
import dataProvider from "./dataProvider";
import authProvider from "./authProvider";
import Dashboard from "./pages/dashboard/Dashboard";

import CreateAdmin from "./pages/admins/CreateAdmin";
import EditAdmin from "./pages/admins/EditAdmin";
import ListAdmins from "./pages/admins/ListAdmins";

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const theme = {
	...defaultTheme,
	palette: {
		mode: 'dark',
	}
}

function App() {
	return (
		<Admin dataProvider={dataProvider} authProvider={authProvider} theme={theme} dashboard={Dashboard}>
			<Resource name="admins" list={ListAdmins} create={CreateAdmin} edit={EditAdmin} icon={AdminPanelSettingsIcon}/>	
		</Admin>
	);
}

export default App;
