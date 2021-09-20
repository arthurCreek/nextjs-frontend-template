import qs from 'qs';
import  {useRouter} from 'next/router';
import  Link from 'next/link';
import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import {API_URL} from '@/config/index';

export interface Props {
  sponsors: any
}

export default function SearchPage(props: Props) {
    const router = useRouter();

  return (
      <Layout title='Search Results'>
          <Link href="/sponsors">Go Back</Link>
          <h1>Search Results for {router.query.term}</h1>
          {props.sponsors.length === 0 && <h3>No sponsorships to show</h3>}

          {props.sponsors.map((spons: any) => (
            <EventItem key={spons.id} sponsor={spons}/>
          ))}
      </Layout>
  )
}

export interface SearchProps {
    query: {
        term: any
    }
}

export async function getServerSideProps(props: SearchProps) {
    const query = qs.stringify({
        _where: {
          _or: [
            { name_contains: props.query.term },
            { description_contains: props.query.term }
          ],
        },
      })
  const res = await fetch(`${API_URL}/sponsors?${query}`);
  const sponsors = await res.json();

  return {
    props: {sponsors}
  }
}