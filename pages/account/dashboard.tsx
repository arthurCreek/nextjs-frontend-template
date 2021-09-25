import { parseCookies } from "../../helpers/index";
import Layout from "@/components/Layout"
import { API_URL } from "@/config/index";

export interface Props {
    sponsors: any
}

export default function DashboardPage(props: Props) {
    console.log(props.sponsors);
    return (
        <Layout title='User Dashboard'>
            <h1>Dashboard</h1>
        </Layout>
    )
}

export interface ServerProp {
    req: any
}

export async function getServerSideProps(serverProps: ServerProp) {
    const {token} = parseCookies(serverProps.req);

    const res = await fetch(`${API_URL}/sponsors/me`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const sponsors = await res.json();

    return {
        props: {
            sponsors
        }
    }
}