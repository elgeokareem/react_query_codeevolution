import { useQuery } from "react-query";
import axios, { AxiosPromise } from "axios";

const fetchUserByEmail = (email: string) => {
  return axios
    .get(`http://localhost:4000/users/${email}`)
    .then(res => res.data);
};

const fetchCoursesByChannelId = (channelId: number) => {
  return axios
    .get(`http://localhost:4000/channels/${channelId}`)
    .then(res => res.data);
};

export default function DependantQueriesPage({ email }: { email: string }) {
  const { data: user } = useQuery(["user", email], () =>
    fetchUserByEmail(email)
  );

  const channelId = user?.channelId;

  const { data: channel } = useQuery<{ id: string; courses: string[] }>(
    ["courses", channelId],
    () => fetchCoursesByChannelId(channelId),
    {
      enabled: !!channelId
    }
  );

  return (
    <>
      <div>Dependent queries</div>

      {channel?.courses.map(course => (
        <div key={course}>{course}</div>
      ))}
    </>
  );
}
