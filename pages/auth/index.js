import { useRouter } from 'next/router'

function Auth() {
    return <div></div>
}
export default Auth

export async function getStaticProps() {
    return {
        redirect: {
            destination: "/auth/login",
        },
    }
}