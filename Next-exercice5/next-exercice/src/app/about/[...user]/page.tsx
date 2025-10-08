export default async function About({
  params,
}: {
  params: Promise<{ user: string }>
}) {
  const { user } = await params
  return <div>My Post: {user[0]}; And my age is {user[1]}</div>
}