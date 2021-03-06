import Head from 'next/head';

import { getFeaturedEvents } from '../helpers/api-util';
import EventList from '../components/events/event-list';
import NewsletterRegistration from '../components/input/newsletter-registration';

function HomePage(props) {
  console.log(props.events)
  return (
    <div>
      <Head>
        <title>Emin sajt za minekraft</title>
        <meta
          name='description'
          content='Find a lot of great events that allow you to evolve...'
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  console.log(featuredEvents)

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
    // fallback: 'blocking'
  };
}

export default HomePage;
