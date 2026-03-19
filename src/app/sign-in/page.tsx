import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Link from "next/link";
import LoginGithubIcon from "@/images/login-github.svg";
import LoginGoogleIcon from "@/images/login-google.svg";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function SignInPage() {
  return (
    <main className="bg-background flex min-h-screen flex-col">
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

                <div className="space-y-4">
                  <Button
                    asChild
                    variant="outline"
                    className="border-foreground/10 bg-background text-foreground/80 hover:bg-foreground/5 hover:text-foreground h-11 w-full rounded-xs font-mono text-sm font-medium shadow-xs [&_svg]:size-5"
                  >
                    <Link
                      href="/sign-in?provider=google"
                      aria-label="Sign in with Google"
                    >
                      <LoginGoogleIcon className="size-5 shrink-0" />
                      Continue with Google
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="border-foreground/10 bg-background text-foreground/80 hover:bg-foreground/5 hover:text-foreground h-11 w-full rounded-xs font-mono text-sm font-medium shadow-xs [&_svg]:size-5"
                  >
                    <Link
                      href="/sign-in?provider=github"
                      aria-label="Sign in with GitHub"
                    >
                      <LoginGithubIcon className="size-5 shrink-0" />
                      Continue with GitHub
                    </Link>
                  </Button>
                </div>

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
