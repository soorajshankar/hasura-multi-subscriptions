import { gql, useSubscription } from "@apollo/client";

const query = gql`
  subscription MySubscription($_eq: Int) {
    test(where: { id: { _eq: $_eq } }) {
      id
    }
  }
`;

export function Subscriptions({ id = 1 }) {
  const { data, error, loading } = useSubscription(query, {
    variables: { _eq: id },
  });
  if (loading) return <p>Loading...</p>;
  return (
    <>
      <h3>Subscription id : {id}</h3>
      {error ? (
        <SubscriptionError {...{ error }} />
      ) : (
        <>
          <h4>Response: </h4>
          <pre
            style={{ backgroundColor: "black", padding: 10, color: "white" }}
          >
            {JSON.stringify(data ?? {}, null, 2)}
          </pre>
        </>
      )}
    </>
  );
}

function SubscriptionError({ error }) {
  return (
    <>
      <p>Error :(</p>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </>
  );
}
