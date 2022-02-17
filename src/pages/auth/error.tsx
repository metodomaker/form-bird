import { InferGetServerSidePropsType } from 'next'

export async function getServerSideProps({ query }) {
  const { error } = query
  if (!error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      message: error as string,
    },
  }
}

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

export default function AuthError({ message }: PageProps) {
  return (
    <div>
      <h1>{message}</h1>
    </div>
  )
}
