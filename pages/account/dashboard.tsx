import { parseCookies } from '../../helpers/index';
import { ToastContainer, toast } from 'react-toastify';
import Layout from '@/components/Layout';
import DashboardEvent from '@/components/DashboardEvent';
import { API_URL } from '@/config/index';
import { useRouter } from 'next/router';
import styles from '@/styles/Dashboard.module.css';
import 'react-toastify/dist/ReactToastify.css';

export interface Props {
  sponsors: any;
  token: any;
}

export default function DashboardPage(props: Props) {
  const router = useRouter();

  const deleteEvent = async (id: any) => {
    if (confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/sponsors/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${props.token}` },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.reload();
      }
    }
  };

  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>

        {props.sponsors.map((spons: any) => {
          return (
            <DashboardEvent
              key={spons.id}
              sponsor={spons}
              handleDelete={deleteEvent}
            />
          );
        })}
      </div>
    </Layout>
  );
}

export interface ServerProp {
  req: any;
}

export async function getServerSideProps(serverProps: ServerProp) {
  const { token } = parseCookies(serverProps.req);

  const res = await fetch(`${API_URL}/sponsors/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const sponsors = await res.json();

  return {
    props: {
      sponsors,
      token,
    },
  };
}
