import { SidebarLayout } from "@/components/layouts/sidebar/";
import { Toaster } from "@/components/ui/toast";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const isLoginPage = pathname === "/login";

  if (isLoginPage) {
    return (
      <>
        <Toaster />
        <Component {...pageProps} />
      </>
    );
  }

  return (
    <SidebarLayout>
      <Toaster />
      <Component {...pageProps} />
    </SidebarLayout>
  );
}
