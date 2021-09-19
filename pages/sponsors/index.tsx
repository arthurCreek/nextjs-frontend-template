import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import {API_URL} from '@/config/index';

export interface Props {
  sponsors: any
}

export default function SponsorsPage(props: Props) {

  return (
      <Layout>
          <h1>Sponsorships</h1>
          {props.sponsors.length === 0 && <h3>No sponsorships to show</h3>}

          {props.sponsors.map((spons: any) => (
            <EventItem key={spons.id} sponsor={spons}/>
          ))}
      </Layout>
  )
}


export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/api/sponsors`);
  const sponsors = await res.json();

  return {
    props: {sponsors}
  }
}