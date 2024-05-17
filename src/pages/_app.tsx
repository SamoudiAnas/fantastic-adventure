import { SidebarLayout } from "@/components/layouts/sidebar/";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const isLoginPage = pathname === "/login";

  if (isLoginPage) {
    return <Component {...pageProps} />;
  }

  return (
    <SidebarLayout>
      <Component {...pageProps} />
    </SidebarLayout>
  );
}
