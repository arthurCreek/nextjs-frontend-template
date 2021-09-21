import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import {API_URL, PER_PAGE} from '@/config/index';
import Pagination from '@/components/Pagination';

export interface Props {
  sponsors: any,
  page: any,
  total: any
}

export default function SponsorsPage(props: Props) {
  const lastPage = Math.ceil(props.total / PER_PAGE);

  return (
      <Layout>
          <h1>Sponsorships</h1>
          {props.sponsors.length === 0 && <h3>No sponsorships to show</h3>}

          {props.sponsors.map((spons: any) => (
            <EventItem key={spons.id} sponsor={spons}/>
          ))}

            <Pagination page={props.page} total={props.total} />
      </Layout>
  )
}


export async function getServerSideProps({query: {page = 1}}) {
  //Calc start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  // Fetch total count
  const totalRes = await fetch(`${API_URL}/sponsors/count`);
  const total = await totalRes.json();

  //Fetch sponsors
  const sponsorRes = await fetch(`${API_URL}/sponsors?_sort=created_at:ASC&_limit=${PER_PAGE}&_start=${start}`);
  const sponsors = await sponsorRes.json();

  return {
    props: {sponsors, page: +page, total}
  }
}