"use client";

import LoginGithubIcon from "@/images/login-github.svg";
import LoginGoogleIcon from "@/images/login-google.svg";
import { Button } from "@/components/ui/button";
import { setFakeSignedIn, type FakeAuthProvider } from "@/lib/fake-auth";
import { useRouter } from "next/navigation";

export function SignInActions() {
  const router = useRouter();

  const handleSignIn = (provider: FakeAuthProvider) => {
    setFakeSignedIn(provider);
    router.push("/dashboard");
  };

  return (
    <div className="space-y-4">
      <Button
        type="button"
        variant="outline"
        className="border-foreground/10 bg-background text-foreground/80 hover:bg-foreground/5 hover:text-foreground h-11 w-full rounded-xs font-mono text-sm font-medium shadow-xs [&_svg]:size-5"
        onClick={() => handleSignIn("google")}
        aria-label="Sign in with Google"
      >
        <LoginGoogleIcon className="size-5 shrink-0" />
        Continue with Google
      </Button>

      <Button
        type="button"
        variant="outline"
        className="border-foreground/10 bg-background text-foreground/80 hover:bg-foreground/5 hover:text-foreground h-11 w-full rounded-xs font-mono text-sm font-medium shadow-xs [&_svg]:size-5"
        onClick={() => handleSignIn("github")}
        aria-label="Sign in with GitHub"
      >
        <LoginGithubIcon className="size-5 shrink-0" />
        Continue with GitHub
      </Button>
    </div>
  );
}
