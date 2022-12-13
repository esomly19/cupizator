import '../styles/globals.css'
import {SessionProvider, useSession} from "next-auth/react";
import {createTheme, NextUIProvider} from "@nextui-org/react";
import {useRouter} from "next/router";
import CustomLoading from "../components/CustomLoading";

const theme = createTheme({
    type: "light", // it could be "light" or "dark"
    theme: {
        colors: {
            gradient: 'linear-gradient(112deg, #432371 -25%, #9F6976 -10%, #FAAE7B 80%)',
            primary:'rgb(141, 92, 118)',
            secondary:'#FAAE7B'
        },
    }
})
export default function MyApp({ Component, pageProps:{ session, ...pageProps } }) {
  return (
      <SessionProvider session={session}>
          <NextUIProvider theme={theme}>
              {Component.auth ? (
                  <Auth>
                      <Component {...pageProps} />
                  </Auth>
              ) : (
                  <Component {...pageProps} />
              )}
          </NextUIProvider>
      </SessionProvider>
  );
}

function Auth({ children }) {
    const router = useRouter();
    const { status } = useSession({ required: true ,onUnauthenticated(){
            router.push('/auth/login');
        }});

    if (status === 'loading') {
        return <CustomLoading></CustomLoading>
    }

    return children;
}

