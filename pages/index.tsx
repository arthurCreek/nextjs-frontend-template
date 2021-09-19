import Layout from '@/components/Layout';
import Link from 'next/link';
import EventItem from '@/components/EventItem';
import {API_URL} from '@/config/index';

export interface Props {
  sponsors: any
}

export default function HomePage(props: Props) {

  return (
      <Layout>
          <h1>Featured Sponsorships</h1>
          {props.sponsors.length === 0 && <h3>No sponsorships to show</h3>}

          {props.sponsors.map((spons: any) => (
            <EventItem key={spons.id} sponsor={spons}/>
          ))}

          {props.sponsors.length > 0 && (
            <Link href='/sponsors'>
              <a className='btn-secondary'>View All Sponsors</a>
            </Link>
          )}
      </Layout>
  )
}


export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/api/sponsors`);
  const sponsors = await res.json();

  return {
    props: {sponsors: sponsors.slice(0,3)}
  }
}