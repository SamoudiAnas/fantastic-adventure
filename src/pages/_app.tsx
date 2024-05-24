import { SidebarLayout } from "@/components/layouts/sidebar/";
import { Toaster } from "@/components/ui/toast";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";

export const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const isLoginPage = pathname === "/login";

  if (isLoginPage) {
    return (
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <Component {...pageProps} />
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarLayout>
        <Toaster />
        <Component {...pageProps} />
      </SidebarLayout>
    </QueryClientProvider>
  );
}
