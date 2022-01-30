import { useEffect, useState } from "react";
import axios from "axios";
import { buildFeedbackPath, extracFeedbackData } from "../pages/api/feedback";

function HomePage(props) {
  console.log(props);
  const [email, setEmail] = useState("");
  const [feed, setFeed] = useState("");
  const [text, setText] = useState("");
  console.log(feed);
  // const getFeedback = async () => {
  //   const { data } = await axios.get("http://localhost:3000/api/feedback");
  //   console.log(data);
  // };

  // useEffect(() => {
  //   getFeedback();
  // }, []);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/api/feedback", {
      email: email,
      feedback: text,
    });
  };

  return (
    <div>
      <h1>The Home Page</h1>
      <div>
        <form onSubmit={handleSubmitForm}>
          <div>
            <label>Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="feedback">Your feedback</label>
            <textarea
              onChange={(e) => setText(e.target.value)}
              id="feedback"
              rows="5"
            ></textarea>
          </div>
          <button type="submit">send feedback</button>
        </form>
      </div>
      {props.feedbackitems.map((item) => {
        return <div key={item.id}>{item.feedback}</div>;
      })}
    </div>
  );
}

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extracFeedbackData(filePath);
console.log('bla')
  return {
    props: {
      feedbackitems: data,
    },
    revalidate: 2
  };
}

export default HomePage;
