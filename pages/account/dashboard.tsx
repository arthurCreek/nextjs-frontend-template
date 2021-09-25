import { parseCookies } from "../../helpers/index";
import Layout from "@/components/Layout"
import DashboardEvent from '@/components/DashboardEvent';
import { API_URL } from "@/config/index";
import styles from '@/styles/Dashboard.module.css';

export interface Props {
    sponsors: any
}

export default function DashboardPage(props: Props) {
    const deleteEvent = (id: any) => {
        console.log(id);
    }

    return (
        <Layout title='User Dashboard'>
            <div className={styles.dash}>
                <h1>Dashboard</h1>
                <h3>My Events</h3>

                {props.sponsors.map((spons: any) => {
                    return <DashboardEvent key={spons.id} sponsor={spons} handleDelete={deleteEvent}/>
                })}
            </div>
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