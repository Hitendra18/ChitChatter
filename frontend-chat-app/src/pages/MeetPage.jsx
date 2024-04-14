import { useParams } from "react-router-dom";

const MeetPage = () => {
  const { meetId } = useParams();
  console.log(meetId);

  return <div>MeetPage</div>;
};
export default MeetPage;
