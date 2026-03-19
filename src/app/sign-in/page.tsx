import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { FakeAuthRedirect } from "@/components/auth/fake-auth-redirect";
import { SignInActions } from "@/components/auth/sign-in-actions";

export default function SignInPage() {
  return (
    <main className="bg-background flex min-h-screen flex-col">
      <FakeAuthRedirect when="signed-in" to="/dashboard" />
      <Navbar />
      <section className="flex flex-1 items-center px-6 py-16 md:px-12 md:py-24 lg:px-20">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mx-auto w-full max-w-lg space-y-5">
            <Card className="border-foreground/10 bg-background rounded-xs py-0 shadow-none">
              <CardContent className="min-h-80 p-10 md:p-12">
                <div className="mb-8 space-y-3 text-center">
                  <h1 className="text-foreground text-2xl font-semibold tracking-tight">
                    Welcome
                  </h1>
                  <p className="text-foreground/60 text-sm">
                    Sign in to continue to the dashboard.
                  </p>
                </div>

                <SignInActions />

                <p className="text-foreground/50 mt-8 text-center text-xs leading-5">
                  By continuing, you agree to our{" "}
                  <Link
                    href="/terms"
                    className="text-foreground/70 hover:text-foreground underline underline-offset-2 transition-colors"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-foreground/70 hover:text-foreground underline underline-offset-2 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
