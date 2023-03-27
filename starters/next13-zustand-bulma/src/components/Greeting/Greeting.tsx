async function getMessage(greeting: string | undefined) {
  const response = await fetch(
    `https://api.starter.dev/.netlify/functions/server/hello?greeting=${greeting}`
  );

  if (!response.ok) {
    const bodyText = await response.text();
    const bodyJson = bodyText ? JSON.parse(bodyText) : null;
    const errorData = bodyJson?.message
      ? bodyJson
      : { message: `Request error: ${response.statusText}` };
    return Promise.reject(errorData);
  }

  return response.text();
}

type Props = {
  greeting?: string;
};

export async function Greeting({ greeting = 'from This Dot Labs!' }: Props) {
  const message = await getMessage(greeting);

  return (
    <div className="level is-size-4">
      <div className="level-item">
        <output className="has-text-weight-bold m-2 p-2">
          Messsage: {message ?? 'loading...'}
        </output>
      </div>
    </div>
  );
}
